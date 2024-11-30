import PropTypes from 'prop-types';
import { userApi } from '../api/userApi';
function Modal({ cartProducts, onClose, updateCart, divisaType, setAvailableProducts }) {
  const onRemove = (id) => {
    updateCart((prevCartProducts) => 
      prevCartProducts.map((product) => {
        if (product.producto.id_producto == id) {
          return { ...product, quantity: product.quantity - 1}
        }
        return product;
      }))
      setAvailableProducts((prevAvailableProducts) => 
        prevAvailableProducts.map((product) => {
          if (product.id_producto == id) {
            return { ...product, stock: product.stock + 1 }
          }
          return product;
        })
      );
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
    return total;
  }

  const handlePay = async() => {
    const total = totalProduct();
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

    const apiUrl = `${import.meta.env.VITE_API_URL}`;

    try {
      const resp = await userApi.post(`${apiUrl}webpay`, data);
      if (Object.keys(resp.data).length > 0) {
        const token = resp.data.token;
        const url = resp.data.url;
  
        // Crear formulario en memoria
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        form.style.display = 'none';
  
        // Crear input para el token
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'token_ws';
        tokenInput.value = token;
  
        // Agregar input al formulario y formulario al cuerpo del documento
        form.appendChild(tokenInput);
        document.body.appendChild(form);
  
        // Enviar formulario
        form.submit();
      } else {
        console.error('Los datos no se recibieron correctamente.');
      }
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
        <p className="total-producto">Total: {formatearPrecio(totalProduct())}</p>
        <div className="btn-cart">
          <button onClick={onClose} className="close-button">
            Cerrar
          </button>
          <button onClick={handlePay} disabled={totalProduct() === '0'} className="close-button">
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
  divisaType: PropTypes.string.isRequired,
  availableProducts: PropTypes.array.isRequired,
  setAvailableProducts: PropTypes.func.isRequired,
};

export default Modal;