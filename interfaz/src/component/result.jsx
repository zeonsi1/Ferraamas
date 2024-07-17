import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '/logo tomi.webp'
import { Link } from 'react-router-dom';
export default function Result() {
  const [transactionDetails, setTransactionDetails] = useState(null);
  const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token_ws = searchParams.get('token_ws');

        if (token_ws) {
            axios.get(`http://localhost:4000/webpay-return?token_ws=${token_ws}`)
                .then(response => {
                    // Verificar si la respuesta es HTML
                    if (response.headers['content-type'].includes('text/html')) {
                        console.error('Expected JSON response, got HTML.');
                    } else {
                        setTransactionDetails(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching transaction details:', error);
                });
        }
    }, [location]);



  return (
    <>
        <div className="result">
            <div className="result-info">
                <Link to="/"><img src={logo} alt="logo" className='logo'/></Link>
                {transactionDetails ?(
                    <>
                    {/* <p>{JSON.stringify(transactionDetails)}</p> */}
                    {transactionDetails.commitResponse.status === 'AUTHORIZED' ? (
                        <>
                            <h1>GRACIAS POR TU COMPRA!</h1>
                            <p>Orden de compra: {transactionDetails.commitResponse.buy_order}</p>
                            {transactionDetails.productos && transactionDetails.productos.length > 0 ? (
                            <div>
                                <h2>Detalle de la compra:</h2>
                                    {transactionDetails.productos.map((producto, index) => (
                                        <>
                                            <p key={index}>Nombre: {producto.nombre}</p>
                                            <p key={index}>Cantidad: {producto.quantity}</p>
                                            <p key={index}>Precio:{producto.price}</p>
                                            <p key={index}></p>
                                        </>
                                    ))}
                            </div>
                            ) : (
                            <p>No hay detalles de productos disponibles.</p>
                        )}
                            <strong>Total: ${transactionDetails.commitResponse.amount}</strong>
                        </>
                    ) : (
                        <>
                        {/* <p>{JSON.stringify(transactionDetails)}</p> */}
                        <h1>Transacción rechazada</h1>
                        </>
                    )}
                    </>
                ) : (
                    <p>Transacción no encontrada</p>
                )}
            </div>
        </div>
    </>
  );
}