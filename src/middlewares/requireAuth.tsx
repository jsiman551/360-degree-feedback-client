import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { logout } from '../redux/slices/authSlice';
import Dashboard from '../pages/dashboard';

interface RequireAuthProps {
    allowedRoles?: string[];
}

interface TokenPayload {
    exp: number;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles = ['Admin', 'Manager', 'Employee'] }) => {
    const { token, user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (token) {
                try {
                    const { exp } = jwtDecode<TokenPayload>(token);
                    const currentTime = Date.now() / 1000;

                    // Verify if token has expired
                    if (exp < currentTime) {
                        dispatch(logout());
                        navigate('/', { replace: true });
                        return;
                    }
                } catch (error) {
                    console.error('Invalid token format:', error);
                    dispatch(logout());
                    navigate('/', { replace: true });
                    return;
                }
            } else {
                navigate('/', { replace: true });  //If there is no token, go to login page
            }
        };

        checkTokenExpiration();

    }, [token, user, allowedRoles, navigate, dispatch]);

    return token && user && allowedRoles.includes(user.role) ? <Outlet /> : <Dashboard />;
};

export default RequireAuth;
