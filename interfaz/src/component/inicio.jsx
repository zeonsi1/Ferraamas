import logo from '/logo tomi.webp'
import icono from '/icono.webp'
import { Link } from 'react-router-dom'
import { userApi } from '../api/userApi';
import { useEffect, useState } from 'react';
import ImageComponent from './ImageComponent';
import cart from '/shopping-cart_2838895.webp';

function Header() {

  return (
    <>
    <header>
      <div className="box">
        <a href=""><img className='cart' src={cart} alt="carrito" /></a> 
        <Link to="/login"><img src={icono} className='login' alt=""/></Link>
      </div> 
      <div className="navBar">
        <div className="caja">
          <Link to="/"><img src={logo} alt="logo" className='logo'/></Link>
          <Link to='/'><h1 className='name'>FERRAA<span>MAS</span></h1></Link>
        </div>
      </div> 
    </header>    
    </>
  );
}
  
function Main(){

  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    getProducts()
  }, []);


  const getProducts = async() => {
    const resp = await userApi.get('http://localhost:4000/products');
    setAvailableProducts( resp.data );
  }

  const card = () => {
  }

  return (
    <>
      <body className='contenedor'>
        <h1 className='title-index'>Nuestros Productos</h1>
        <div className="grid">
          {availableProducts.map((producto, index) => (
            <div key={index}>
              <div className="producto">
                <a href="" onClick={card()}>
                  <ImageComponent producto={producto}/>
                  <div className="info">
                    <p className="nombreProducto" value={producto.nombre_producto}>{producto.nombre_producto}</p>
                    <p className="precioProducto" value={producto.precio_producto}>Precio: <span>${producto.precio_producto}</span></p>                            
                  </div>
                </a>
              </div>  
              <div className="btn-carrito">
                <button>Agregar al carrito</button>
              </div>               
            </div>
          ))} 
        </div>
      </body>
    </>
  )
}


export default function Inicio (){
  return(
      <>
        <Header />
        <Main />
      </>
  )
}