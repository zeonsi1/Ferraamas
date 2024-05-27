import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function Modal({ cartProducts: initialCartProducts, onClose }) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  const onRemove = (id) => {
    setCartProducts((prevCartProducts) => 
      prevCartProducts.map((product) => {
        if (product.producto.id_producto == id) {
          return { ...product, quantity: product.quantity - 1}
        }
        return product;
      }))
  }

  useEffect(() => {
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Carrito</h2>
        <ul className="cart-list">
          {cartProducts.map((product, index) => (
            <li key={index} className="cart-item">
              <div className="product-info">
                <h3>{product.producto.nombre_producto}</h3>
                <p>Cantidad: {product.quantity}</p>
                <p>Precio: {product.producto.precio_producto}</p>
              </div>
              <button onClick={() => onRemove(product.producto.id_producto)} className="remove-button">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cartProducts: PropTypes.array.isRequired,
  updateCart: PropTypes.func.isRequired
};

export default Modal;