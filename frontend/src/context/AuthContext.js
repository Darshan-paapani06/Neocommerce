import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('neo_token');
        const userData = localStorage.getItem('neo_user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = async(email, password) => {
        const { data } = await apiLogin({ email, password });
        localStorage.setItem('neo_token', data.token);
        localStorage.setItem('neo_user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
    };

    const register = async(name, email, password) => {
        const { data } = await apiRegister({ name, email, password });
        localStorage.setItem('neo_token', data.token);
        localStorage.setItem('neo_user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('neo_token');
        localStorage.removeItem('neo_user');
        setUser(null);
    };

    return React.createElement(
        AuthContext.Provider, { value: { user, loading, login, register, logout } },
        props.children
    );
};

export const useAuth = () => useContext(AuthContext);