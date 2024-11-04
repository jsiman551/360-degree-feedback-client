import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchEmployeeReport } from '../../redux/thunks/reportThunks';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Report from '../../components/report';

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (user && token) {
            dispatch(fetchEmployeeReport({ employeeId: user.id, token }));
        }
    }, [user, token, dispatch]);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <Header />
            <main className="flex-grow p-4">
                <h1 className="text-2xl font-bold mt-6 mb-10 text-center">
                    Welcome, {user?.username}!
                </h1>

                <div className='mx-auto max-w-5xl'>
                    {/* Report Section */}
                    <Report employeeId={user?.id} token={token} />

                    {/* Navigation Section */}
                    <div className="flex justify-center space-x-4">
                        {(user?.role === "Admin" || user?.role === "Manager") && (
                            <Link to="/employees">
                                <div className="card bg-blue-50 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-600 shadow-lg text-center p-6 rounded-lg transition-transform transform hover:scale-105">
                                    <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-200">Employees</h2>
                                    <p className="text-slate-700 dark:text-slate-300">Manage your employees.</p>
                                </div>
                            </Link>
                        )}
                        <Link to={`/employees/${user?.id}/evaluations`}>
                            <div className="card bg-blue-50 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-600 shadow-lg text-center p-6 rounded-lg transition-transform transform hover:scale-105">
                                <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-200">Evaluations</h2>
                                <p className="text-slate-700 dark:text-slate-300">How have you been evaluated.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
