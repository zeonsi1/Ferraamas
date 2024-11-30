import logo from '/logo tomi.webp'
import icono from '/icono.webp'
import { Link } from 'react-router-dom'
import { userApi } from '../api/userApi';
import { useEffect, useState } from 'react';
// import ImageComponent from './ImageComponent';
import cart from '/shopping-cart_2838895.webp';
import Modal from '../Modals/carritoModal';
import PropTypes from 'prop-types';

function Header({cartProducts, updateCart, divisaType, setAvailableProducts}) {
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

    {showModal && <Modal cartProducts={cartProducts} onClose={handleClose} updateCart={updateCart} divisaType={divisaType} setAvailableProducts={setAvailableProducts}/>}  
    </>
  );
}
  
function Main({cartProducts, setCart, setDivisa, divisaType, availableProducts, setAvailableProducts}) {

  useEffect(() => {
    const getProducts = async() => {
      const apiUrl = `${import.meta.env.VITE_API_URL}products`;
      try {
        const resp = await userApi.get(apiUrl);
        setAvailableProducts( resp.data );
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
  
    getProducts();
  }, [setAvailableProducts]);
  
  const divisa = async (e) => {
    let selectedDivisa = e.target.value;
    let data = { 'divisa': selectedDivisa };
    
    const apiUrl = `${import.meta.env.VITE_API_URL}products2`;
  
    try {
      const resp = await userApi.post(apiUrl, data);
      
      const updatedProducts = resp.data.map((product, index) => {
        return {
          ...availableProducts[index],
          precio_producto: product.precio_producto
        };
      });
      
      setAvailableProducts(updatedProducts);
      setDivisa(selectedDivisa);
      setCart(cartProducts.map((item) => {
        const updatedProduct = updatedProducts.find((product) => product.id_producto === item.producto.id_producto);
        return { 
          ...item, 
          producto: { ...item.producto, precio_producto: updatedProduct.precio_producto } 
        };
      }));
    } catch (error) {
      console.error("Error al cambiar divisa:", error);
    }
  };
  

 
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
    e.preventDefault();
    // Disminuir el stock del producto antes de agregarlo al carrito
    const updatedProducts = availableProducts.map((p) => {
      if (p.id_producto === producto.id_producto && p.stock > 0) {
        return { ...p, stock: p.stock - 1 };
      }
      return p;
    });

    setAvailableProducts(updatedProducts); // Actualizar el estado con los productos actualizados
  
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.producto.id_producto === producto.id_producto);
      if (existingItem) {
        return prevCart.map((item) => {
          if (item.producto.id_producto === producto.id_producto) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...prevCart, { producto, quantity: 1 }];
      }
    });
  };

  const productsWithStock = availableProducts.filter((producto) => producto.stock > 0);

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
          {productsWithStock.map((producto, index) => (
            <div key={index}>
              <div className="producto">
                <a onClick={(event) => cartShop(producto, event)} href="" >
                  {/* <ImageComponent producto={producto}/> */}
                  <div className="info">
                    <p className="nombreProducto" value={producto.nombre_producto}>{producto.nombre_producto}</p>
                    <p className="precioProducto"><span>Stock: </span>{producto.stock}</p>
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
  cartProducts: PropTypes.array.isRequired,
  divisaType: PropTypes.string.isRequired,
  setDivisa: PropTypes.func.isRequired,
  setCart: PropTypes.func.isRequired,
  availableProducts: PropTypes.array.isRequired,
  setAvailableProducts: PropTypes.func.isRequired,
};

Header.propTypes = {
  cartProducts: PropTypes.array.isRequired,
  divisaType: PropTypes.string.isRequired,
  updateCart: PropTypes.func.isRequired,
  setAvailableProducts: PropTypes.func.isRequired,
};

export default function Inicio (){
  const [cartProducts, setCart] = useState([]);
  const [divisaType, setDivisa] = useState('CLP');
  const [availableProducts, setAvailableProducts] = useState([]);
  const updateCart = (newCart) => {
    setCart(newCart);
  }
  return(
      <>
        <Header cartProducts={cartProducts} updateCart={updateCart} divisaType={divisaType} setAvailableProducts={setAvailableProducts}/>
        <Main cartProducts={cartProducts} setCart={setCart} setDivisa={setDivisa} divisaType={divisaType} availableProducts={availableProducts} setAvailableProducts ={setAvailableProducts}/>
      </>
  )
}

