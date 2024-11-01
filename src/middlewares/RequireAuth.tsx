import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const RequireAuth: React.FC = () => {
    const { token } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/', { replace: true });
        }
    }, [token, navigate]);

    return token ? <Outlet /> : null;
};

export default RequireAuth;
