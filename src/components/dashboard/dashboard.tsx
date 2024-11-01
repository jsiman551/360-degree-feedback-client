import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import Footer from '../footer';
import Header from '../header';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow p-4 bg-slate-100 dark:bg-slate-900">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-10 text-center">
                    Welcome, {user?.username}!
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {user?.role === "Admin" || user?.role === "Manager" ? <Link to={'/employees'}>
                        <div className="card bg-white shadow-lg dark:bg-slate-800 transition-transform duration-200 transform hover:scale-105 hover:bg-blue-200 dark:hover:bg-blue-600">
                            <div className="card-body">
                                <h2 className="card-title">Employees</h2>
                                <p>Manage your employees.</p>
                            </div>
                        </div>
                    </Link> : null}
                    <div className="card bg-white shadow-lg dark:bg-slate-800">
                        <div className="card-body">
                            <h2 className="card-title">Evaluations</h2>
                            <p>View and manage evaluations.</p>
                        </div>
                    </div>
                </div>
            </main >
            <Footer />
        </div >
    );
};

export default Dashboard;
