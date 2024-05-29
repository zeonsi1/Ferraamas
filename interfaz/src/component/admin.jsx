import { useLocation } from "react-router-dom";
import HeaderCommon from "./header";
import { useEffect, useState } from "react";
import { userApi } from "../api/userApi";
export default function Admin() {
    const [availableUsers, setAvailableUsers] = useState([]);

    const location = useLocation();
    const pnombre = location.state.pnombre;
    
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async() => {
        const resp = await userApi.get('http://localhost:4000/users-mostrar');
        setAvailableUsers(resp.data);
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
                        <th>Password Usuario</th>
                        <th>Tipo de Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.pnombre_user}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.nombre_tipo_user}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}