// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import logo from '/logo tomi.webp'
import icono from '/icono.webp'
import './App.css'
import martillo from '/martillo-inoxcrom.webp'
import taladro from '/1108295804_63.webp'
import set from '/1548638_18.webp'



function Header() {
  
  return (
    <>
      <header>
        <div className="box">
          <a href=""><img src={icono} className='login' alt=""/></a>
        </div>
        <div className="navBar">
          <div className="caja">
            <a href=""><img src={logo} alt="logo" className='logo'/></a>
            <h1 className='name'>FERRAA<span>MAS</span></h1>          
          </div>          
        </div>  
      </header>    
    </>
  );
}

function Main(){
  return (
    <>
      <main className='contenedor'>
        <h1 className='title'>Nuestros <br />Productos</h1>

        <div className="grid">
          
          <div className="producto">
            <a href=""> 
              <img className='productoImg' src={martillo} alt="" />

              <div className="info">
                <p className="nombreProducto">Martillo</p>
                <p className="precioProducto">Precio: <span>$15000</span></p>
              </div>
            </a>
          </div>

          <div className="producto">
            <a href="">
              <img className='productoImg' src={taladro} alt="" />
              <div className="info">
                <p className="nombreProducto">Taladro</p>
                <p className="precioProducto">Precio: <span>$35000</span></p>
              </div>
            </a>          
          </div>

          <div className="producto">
            <a href="">
              <img className='productoImg' src={set} alt="" />
              <div className="info">
                <p className="nombreProducto">Set de Herramientas</p>
                <p className="precioProducto">Precio: <span>$100000</span></p>
              </div>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      
      <Main />
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
