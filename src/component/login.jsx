import { useState } from 'react';
import logo from '/logo tomi.webp'
import { Link } from 'react-router-dom';
import { userApi } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email : '',
        password : '',
    });

    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false
    });

    const [errorMessage, setErrorMessage] = useState([]);

    const [showMessage, setShowMessage] = useState(false);

    const [formValid, setFormValid] = useState(false);

    const emailIsInvalid = didEdit.email && !values.email.includes('@');

    const passwordIsInvalid = didEdit.password && values.password.trim().length < 6;

    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    
   
    function validateForm() {
        const isEmailValid = values.email.trim() !== '' && values.email.includes('@');
        const isPasswordValid = values.password.trim().length >= 5;
        return isEmailValid && isPasswordValid;
    }

    function handleFormChange() {
        setFormValid(validateForm())
    }


    const handleSumbit = async(e) => {
        let user = 0;
        e.preventDefault();
        let pnombre = '';
        let message = '';
        const apiUrl = 'https://api-ferramas-pb6j.onrender.com/users';


        try{
            
            const resp = await userApi.post(apiUrl, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const token = resp.data.token;
            
            localStorage.setItem('token', token);

            const decodedToken = jwtDecode(token);

            user = decodedToken.id_tipo_user;
            pnombre = decodedToken.pnombre_user;
            switch (user) {
                case 1:
                    navigate('/admin', {state: {pnombre}});
                    break;
                case 2:
                    navigate('/bodeguero', {state: {pnombre}});
                    break;
                case 3:
                    navigate('/', {state: {pnombre}});
                    break;
                case 4:
                    navigate('/contador', {state: {pnombre}});
                    break;
            }

        }catch (error) {
            if (error.request.status == 401) {
                message = 'Email o Contraseña Invalida';
                console.log(message)
                setFailedAttempts(failedAttempts + 1);
                
                if (failedAttempts + 1 >= 3) {
                    message = 'Demasiados intentos fallidos, \nintente nuevamente en 1 minuto';
                    setIsBlocked(true);
                    setTimeout(() => {
                        setIsBlocked(false);
                        setFailedAttempts(0);
                    }, 60000);
                }

                setErrorMessage(message);
                setShowMessage(true);
                
            } else if (error.request.status == 500){
                message = 'Error en el servidor'
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    function handleInputChange(id, value) {
        setValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));

        setDidEdit((prevValues) => ({
            ...prevValues,
            [id]: false,
        }));

        setShowMessage(false);
        setFormValid(false);
    }

    function handleInputBlur (id) {
        setDidEdit((prevValues) => ({
            ...prevValues,
            [id]: true
        }));
    }

    return(
        <>
            <div className="form">
                <form onSubmit={handleSumbit} onChange={handleFormChange}>                   
                    <div className="log">
                        <Link to='/'><img src={logo} alt="logo" className='logo'/></Link>
                    </div>
                    <Link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back-up" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 14l-4 -4l4 -4" />
                        <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                        </svg>
                    </Link>
                    <h1 className='title'>Iniciar \ <span>Sesion</span></h1>
                    <label htmlFor="email" className='lblIni'>Email</label>                
                    <div className="input-box">                
                        <input 
                            id='email'
                            type="email" 
                            name='email'
                            placeholder='Ingresa tu Email'                       
                            onBlur={() => handleInputBlur('email')}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            value={values.email}
                            required                       
                        />                        
                    </div>
                    <div className="control-error">
                        {emailIsInvalid && <p>Ingrese un Email valido</p>}
                    </div>
                    <label htmlFor="password" className='lblIni'>Ingresa tu Contraseña</label>
                    <div className="input-box">
                        <input
                            id='password'
                            type="password"
                            name='password'
                            placeholder='Ingrese su Contraseña'
                            onBlur={() => handleInputBlur('password')}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            value={values.password}
                            required
                        />
                    </div>
                    <div className="control-error">
                        {passwordIsInvalid && <p>La Contraseña es muy corta</p>}
                    </div>
                    <div className="control-error">
                        {showMessage && <p>{errorMessage}</p>}
                    </div>
                    <div className="register">
                        <p>No Tienes Cuenta? <Link to={'/register'} style={{color: 'white', textDecorationLine: 'underline'}}>Haz Click Aquí</Link></p>
                    </div>
                    <br />
                    <div className="btn-submit">
                        <button disabled={!formValid || isBlocked} type='submit'>Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;