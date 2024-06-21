import { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import PropTypes from 'prop-types';


export default function ImageComponent ({ producto }) {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    if (producto && producto.imagen_producto) {
      const imageBuffer = Buffer.from(producto.imagen_producto.data);
      const base64Image = imageBuffer.toString('base64'); 
      setImageData(`data:image/${producto.imagen_producto.type};base64,${base64Image}`); 
    } else {
      console.warn('Invalid or missing image data for product:', producto.id);
    }
  }, [producto]); 

  return (
    <div>
      {imageData && (
        <img className='productoImg' src={imageData} alt="Imagen recuperada de la API" />
      )}
    </div>
  );
}

ImageComponent.propTypes = {
  producto: PropTypes.array.isRequired,
};

