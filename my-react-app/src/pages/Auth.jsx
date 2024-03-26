import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('desologinkey');
        if (!token || isTokenExpired(token)) {
            alert('Session expired. Please login again.');
            localStorage.removeItem('desologinkey');
            navigate('/');
        }
    }, [navigate]);

    const isTokenExpired = (token) => {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    };
};

export default useAuth;
