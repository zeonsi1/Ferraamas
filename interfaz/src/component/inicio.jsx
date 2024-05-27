import logo from '/logo tomi.webp'
import icono from '/icono.webp'
import { Link } from 'react-router-dom'
import { userApi } from '../api/userApi';
import { useEffect, useState } from 'react';
import ImageComponent from './ImageComponent';
import cart from '/shopping-cart_2838895.webp';
import Modal from '../Modals/carritoModal';
import PropTypes from 'prop-types';

function Header({cartProducts}) {
  const [showModal, setShowModal] = useState(false);

  const quantityV = () => {
    let cantidad = 0;
    cartProducts.forEach((product) => {
      cantidad += product.quantity;
    });
    return cantidad;
  }

  useEffect(() => {
  }, [cartProducts]);
  
  const handleClick = (e) => {
    e.preventDefault()
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
    <header>
      <div className="box">
        <a style={{color: 'black', cursor: 'pointer'}} onClick={handleClick}><img className='cart' src={cart} alt="carrito" />{quantityV()}</a> 
        <Link to="/login"><img src={icono} className='login' alt=""/></Link>
      </div> 
      <div className="navBar">
        <div className="caja">
          <Link to="/"><img src={logo} alt="logo" className='logo'/></Link>
          <Link to='/'><h1 className='name'>FERRAA<span>MAS</span></h1></Link>
        </div>
      </div> 
    </header>

    {showModal && <Modal cartProducts={cartProducts} onClose={handleClose} />}  
    </>
  );
}
  
function Main({setCart}){
  const [availableProducts, setAvailableProducts] = useState([]);
  const [divisaType, setDivisa] = useState();

  useEffect(() => {
    getProducts()
  }, []);


  const getProducts = async() => {
    const resp = await userApi.get('http://localhost:4000/products');
    setAvailableProducts( resp.data );
  }
  
  const divisa = async(e) => {
    let selectedDivisa = e.target.value;
    let data = {'divisa': selectedDivisa}
    const resp = await userApi.post('http://localhost:4000/products2', data);    
    const updatedProducts = resp.data.map((product, index) => {
      return {
        ...availableProducts[index], 
        precio_producto: product.precio_producto
      };
    })
    setAvailableProducts(updatedProducts);
    setDivisa(selectedDivisa);
  }

  const formatearPrecio = (precio) => {
    let simbolo = 'clp$';
    
    switch (divisaType) {
      case 'EUR':
        simbolo = '€';
        break;
      case 'CLP':
        simbolo = 'clp$';
        break;
      case 'USD':
        simbolo = 'usd$';
        break;
    }

    return `${simbolo}${precio.toLocaleString("es-Cl")}`;
  }

  const cartShop = (producto, e) => {
    e.preventDefault()
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.producto === producto);
      if (existingItem) {
        return prevCart.map((item) => {
          if (item.producto === producto) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...prevCart, { producto, quantity: 1 }];
      }
    });
  }

  return (
    <>
      <div className='contenedor'>
        <h1 className='title-index'>Nuestros Productos</h1>
        <div className="divisaSelector">
          <div className="titleD">
            <label className='title-divisa' htmlFor="divisa">Selecciona la divisa <br /></label>
          </div>
          <select defaultValue={"CLP"} onChange={divisa} className='selector-divisa' name="divisa" id="divisa">
            <option value="CLP">CLP - Peso Chileno</option>
            <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - Dolar Estado Unidense</option>
          </select>
        </div>
        <div className="grid">
          {availableProducts.map((producto, index) => (
            <div key={index}>
              <div className="producto">
                <a onClick={(event) => cartShop(producto, event)} href="" >
                  <ImageComponent producto={producto}/>
                  <div className="info">
                    <p className="nombreProducto" value={producto.nombre_producto}>{producto.nombre_producto}</p>
                    <p className="precioProducto" value={producto.precio_producto}>{formatearPrecio(producto.precio_producto)}</p>
                  </div>
                </a>
              </div>  
              <div className="btn-carrito">
                <button onClick={(event) => cartShop(producto, event)}>Agregar al carrito</button>
              </div>        
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

Main.propTypes = {
  setCart: PropTypes.func.isRequired
};

Header.propTypes = {
  cartProducts: PropTypes.array.isRequired,
  updateCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default function Inicio (){
  const [cartProducts, setCart] = useState([]);
  const updateCart = (newCart) => {
    setCart(newCart);
  }
  return(
      <>
        <Header cartProducts={cartProducts} updateCart={updateCart}/>
        <Main setCart={updateCart}/>
      </>
  )
}