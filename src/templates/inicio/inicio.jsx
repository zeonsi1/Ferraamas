import logo from '/logo tomi.webp'
import icono from '/icono.webp'
import './inicio.css'
import { Link } from 'react-router-dom'
import { userApi } from '../../api/userApi';
import { useEffect, useState } from 'react';
import ImageComponent from '../../component/ImageComponent';

function Header() {

  return (
    <>
    <header>
      <div className="box">
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
            <div className="producto" key={index}>
              <a href="">
                <ImageComponent producto={producto}/>
                <div className="info">
                  <p className="nombreProducto">{producto.nombre_producto}</p>
                  <p className="precioProducto">Precio: <span>${producto.precio_producto}</span></p>
                  <button>Agregar al carrito</button>
                </div>
              </a>
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