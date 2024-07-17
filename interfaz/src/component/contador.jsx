import { useLocation } from "react-router-dom";
import HeaderCommon from "./header";
import { userApi } from "../api/userApi";
import { useEffect, useState } from "react";

export default function Contador() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    const location = useLocation();
    const pnombre = location.state.pnombre;

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const resp = await userApi.get('http://localhost:4000/products');
        setProducts( resp.data );
    }

    const formatearPrecio = (precio) => {
        return `clp$${precio.toLocaleString("es-Cl")}`;
    }

    const incrementarStock = (index) => {
        const newProducts = [...products];
        newProducts[index].stock++;
        setProducts(newProducts);
    }

    const decrementarStock = (index) => {
        const newProducts = [...products];
        if (newProducts[index].stock > 0) {
            newProducts[index].stock -= 1;
            setProducts(newProducts);
        }
    }

    const updateStock = async (index) => {
        const producto = products[index];
        try {
            const resp = await userApi.put('http://localhost:4000/update-stock', producto);
            setMessage(prevMessages => {
                const newMessages = [...prevMessages];
                newMessages[index] = { message: resp.data.message, showMessage: true };
                return newMessages;
            });
    
            setTimeout(() => {
                setMessage(prevMessages => {
                    const messagesCopy = [...prevMessages];
                    if (messagesCopy[index]) {
                        messagesCopy[index] = { ...messagesCopy[index], showMessage: false };
                        return messagesCopy;
                    }
                    return prevMessages; // Retorna el estado anterior si no hay cambios
                });
            }, 3000);
        } catch (error) {
            setMessage(prevMessages => {
                const newMessages = [...prevMessages];
                newMessages[index] = { message: 'Error al actualizar el stock', showMessage: true };
                return newMessages;
            });
    
            setTimeout(() => {
                setMessage(prevMessages => {
                    const messagesCopy = [...prevMessages];
                    if (messagesCopy[index]) {
                        messagesCopy[index] = { ...messagesCopy[index], showMessage: false };
                        return messagesCopy;
                    }
                    return prevMessages; // Retorna el estado anterior si no hay cambios
                });
            }, 3000);
        }
    }

    return(
        <>
            <HeaderCommon name={pnombre}/>
            <div style={{marginTop: 80}} className="grid">
                {products.map((producto, index)=>(
                    <div key={index}>
                        <div className="producto">
                            <div className="info">
                                <p className="nombreProducto">{producto.nombre_producto}</p>
                                <p className="precioProducto">{formatearPrecio(producto.precio_producto)}</p>
                                <div className="stock-container precioProducto">
                                    <span>Stock: </span>{producto.stock}
                                    <button onClick={() => incrementarStock(index)} className="boton-stock incrementar">+</button>
                                    <button onClick={() => decrementarStock(index)} className="boton-stock decrementar">-</button>
                                </div>
                                <div className="control-error">
                                    {message[index]?.showMessage && <p style={{color: "green"}}>{message[index]?.message}</p>}
                                </div>
                                <div style={{marginTop: 20}} className="btn-stock">
                                    <button onClick={() => updateStock(index)} className="btnStock">Aceptar</button> 
                                </div>                                         
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}