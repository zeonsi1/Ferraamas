import PropTypes from 'prop-types';
import { userApi } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
function Modal({ cartProducts, onClose, updateCart, divisaType }) {
  const navigate = useNavigate();
  const onRemove = (id) => {
    updateCart((prevCartProducts) => 
      prevCartProducts.map((product) => {
        if (product.producto.id_producto == id) {
          return { ...product, quantity: product.quantity - 1}
        }
        return product;
      }))
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

  const totalProduct = () => {
    let total = 0;
    cartProducts.forEach((product) => {
      total += product.producto.precio_producto * product.quantity;
    });
    return formatearPrecio(total);
  }

  const handlePay = async() => {
    const total = totalProduct().replace(/[^\d]/g, '');
    const products = cartProducts.map((product) => ({
      id: product.producto.id_producto,
      nombre: product.producto.nombre_producto,
      quantity: product.quantity,
      price: product.producto.precio_producto,
    }));
  
    const data = {
      total,
      products,
      divisaType
    };

    try {
      const resp = await userApi.post('http://localhost:4000/webpay', data);
      if (Object.keys(resp.data).length > 0) {
        let token = '';
        let url = '';
        token = resp.data.token;
        url = resp.data.url;
        navigate('/pagar', {state:{token, url}});
      } else {
        console.error('Los datos no se recibieron correctamente.');
      }
      console.log(resp.data);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title-modal">
          <h2>Carrito</h2>
          <p>{divisaType}</p>
        </div>
        <ul className="cart-list">
          {cartProducts.filter(product => product.quantity > 0 ).map((product, index) => (
            <li key={index} className="cart-item">
              <div className="product-info">
                <h3>{product.producto.nombre_producto}</h3>
                <p>Cantidad: {product.quantity}</p>
                <p>Precio: {formatearPrecio(product.producto.precio_producto * product.quantity)}</p>
              </div>
              <button onClick={() => onRemove(product.producto.id_producto)} className="remove-button">
                Eliminar
              </button>
            </li>            
          ))}
        </ul>
        <p className="total-producto">Total: {totalProduct()}</p>
        <div className="btn-cart">
          <button onClick={onClose} className="close-button">
            Cerrar
          </button>
          <button onClick={handlePay} disabled={totalProduct().replace(/[^\d]/g, '') === '0'} className="close-button">
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  cartProducts: PropTypes.array.isRequired,
  updateCart: PropTypes.func.isRequired,
  divisaType: PropTypes.string.isRequired
};

export default Modal;