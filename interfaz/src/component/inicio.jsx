import logo from '/logo tomi.webp'
import icono from '/icono.webp'
import { Link } from 'react-router-dom'
import { userApi } from '../api/userApi';
import { useEffect, useState } from 'react';
import ImageComponent from './ImageComponent';


function Header() {

  return (
    <>
    <header>
      <div className="box">
        <svg width={60} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
          <path xmlns="http://www.w3.org/2000/svg" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/> 
        </svg>   
        <Link to="/login"><img src={icono} className='login' alt=""/></Link>
      </div> 
      <div className="navBar">
        <div className="caja">
          <a href=""><img src={logo} alt="logo" className='logo'/></a>
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

  return (
    <>
      <body className='contenedor'>
        <h1 className='title-index'>Nuestros Productos</h1>
        
        <div className="grid">
          {availableProducts.map((producto, index) => (
            <div key={index}>
              <div className="producto">
                <a href="">
                  <ImageComponent producto={producto}/>
                  <div className="info">
                    <p className="nombreProducto">{producto.nombre_producto}</p>
                    <p className="precioProducto">Precio: <span>${producto.precio_producto}</span></p>                            
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