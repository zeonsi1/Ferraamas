import './login.css'
import logo from '/logo tomi.webp'
import { Link } from 'react-router-dom';
function Login() {


    return(
        <>
            <div className="form">
                <form >                   
                    <div className="log">
                        <Link to='/'><img src={logo} alt="logo" className='logo'/></Link>
                    </div>
                    <Link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 14l-4 -4l4 -4" />
                        <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                        </svg>
                    </Link>
                    <h1 className='title'>Iniciar \ <span>Sesion</span></h1>
                    <label htmlFor="email" className='lblIni'>Ingresa tu Email</label>                
                    <div className="input-box">                
                        <input 
                            type="email" 
                            placeholder='Ingrese su Email'
                            className='input-email'                                        
                        /> 
                    </div>
                    <label htmlFor="password" className='lblIni'>Ingresa tu Contraseña</label>
                    <dv className="input-box">
                        <input 
                            type="password"
                            placeholder='Ingrese su Contraseña'                                         
                        />
                    </dv>               
                    <br />   
                    <div className="btn-submit">
                        <button type='submit'>Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;