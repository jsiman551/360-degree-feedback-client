import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface RequireAuthProps {
    allowedRoles?: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles = ['Admin', 'Manager', 'Employee'] }) => {
    const { token, user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !user || !allowedRoles.includes(user.role)) {
            navigate('/', { replace: true });
        }
    }, [token, user, allowedRoles, navigate]);

    return token && user && allowedRoles.includes(user.role) ? <Outlet /> : null;
};

export default RequireAuth;
