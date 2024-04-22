import { useState, useEffect } from 'react';
import { Buffer } from 'buffer'; // Import Buffer
import '../templates/inicio/inicio.css'


const ImageComponent = ({ producto }) => {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    if (producto && producto.imagen_producto) {
      const imageBuffer = Buffer.from(producto.imagen_producto.data); // Extract Buffer data
      const base64Image = imageBuffer.toString('base64'); // Convert Buffer to base64
      setImageData(`data:image/${producto.imagen_producto.type};base64,${base64Image}`); // Construct image source
    } else {
      // Handle cases where image data is missing or invalid
      console.warn('Invalid or missing image data for product:', producto.id); // Or display a placeholder image
    }
  }, [producto]); // Dependency on producto

  return (
    <div>
      {imageData && (
        <img className='productoImg' src={imageData} alt="Imagen recuperada de la API" />
      )}
    </div>
  );
};

export default ImageComponent;