import { useLocation } from "react-router-dom";
import HeaderCommon from "./header";
import { useEffect, useState } from "react";
import { userApi } from "../api/userApi";
export default function Admin() {
    const [availableUsers, setAvailableUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const apiUrl = `${import.meta.env.VITE_API_URL}`;
    const location = useLocation();
    const pnombre = location.state.pnombre;
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async() => {
        const resp = await userApi.post(`${apiUrl}users-mostrar`, {token});
        setAvailableUsers(resp.data);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const resp = await userApi.get(`${apiUrl}products`);
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

    const handlePriceChange = (index, newPrice) => {
        if (newPrice < 0) {
            return;
        }
        const updatedProducts = [...products];
        updatedProducts[index].precio_producto = newPrice;
        setProducts(updatedProducts);
    }

    const updateStock = async (index) => {
        const producto = products[index];
        try {
            const resp = await userApi.put(`${apiUrl}update-stock`, producto);
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
            <section className="table-user">
                <table className="table">
                    <caption >Usuarios</caption>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nombre Usuario</th>
                        <th>Email Usuario</th>
                        <th>Tipo de Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id_user}</td>
                            <td>{user.pnombre_user}</td>
                            <td>{user.email}</td>
                            <td>{user.tipo_user}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <hr />
            <div className="main">
                <h1 className="title-admin">Productos</h1>
            </div>
            <div style={{marginTop: 10, paddingBottom: 500}} className="grid">        
                {products.map((producto, index)=>(
                    <div key={index}>
                        <div className="producto">
                            <div className="info">
                                <p className="nombreProducto">{producto.nombre_producto}</p>
                                <p className="precioProducto">{formatearPrecio(producto.precio_producto)}</p>
                                <div className="input-price">
                                    <input
                                        type="text"
                                        value={producto.precio_producto}
                                        onChange={(e) => handlePriceChange(index, e.target.value)}
                                        className="precioProductoInput"
                                    />
                                </div>
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