import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { logout } from '../redux/slices/authSlice';
import Button from './button';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="navbar bg-slate-800 text-white">
            <div className="flex-1">
                <Link to="/dashboard" className="btn btn-ghost text-xl">
                    360 Degree Feedback
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Button onClick={handleLogout} variant="ghost">
                            Logout
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
