import { Link } from 'react-router-dom';
import logo from '/logo tomi.webp'
import PropTypes from 'prop-types';

export default function HeaderCommon({name}) {
    function capitalize(text) {
        const firstLetter = text.charAt(0);
        const rest = text.slice(1);
        return firstLetter.toUpperCase() + rest;
    }

    return(
        <>
            <div style={{marginTop: 25}} className="caja">
                <Link to="/"><img src={logo} alt="logo" className='logo'/></Link>
                <h1 className="name">Bienvenido <span>{capitalize(name)}</span>!</h1>
            </div>
        </>
    );
}

HeaderCommon.propTypes = {
    name: PropTypes.string.isRequired,
}