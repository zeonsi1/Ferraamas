import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { userApi } from "../api/userApi";

const ProtectedRoute = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const verifyToken = async () => {
            const apiUrl = `https://api-ferramas-pb6j.onrender.com/verify-token`;

            try {
                await userApi.post(apiUrl, { token });
                setIsVerified(true);
            } catch (error) {
                localStorage.removeItem('token');
                setIsVerified(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            verifyToken();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>; // Puedes mostrar un spinner o mensaje de carga aquí
    }

    if (!isVerified) {
        return <Navigate to="/login" />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;