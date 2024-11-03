import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchEmployeeReport } from '../../redux/thunks/reportThunks';
import Footer from '../footer';
import Header from '../header';
import Loading from '../loading';
import { Link } from 'react-router-dom';
import { renderStars } from '../../utils/helpers';

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);
    const { report, loading, error } = useAppSelector((state) => state.report);

    useEffect(() => {
        if (user && token) {
            dispatch(fetchEmployeeReport({ employeeId: user.id, token }));
        }
    }, [user, token, dispatch]);

    const getPerformanceMessage = (averageScore: number) => {
        if (averageScore >= 4.5) return "Excellent performance!";
        if (averageScore >= 3.5) return "Good performance!";
        if (averageScore >= 2.5) return "Needs improvement.";
        return "Poor performance. Consider focusing on key areas.";
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <Header />
            <main className="flex-grow p-4">
                <h1 className="text-2xl font-bold mt-6 mb-10 text-center">
                    Welcome, {user?.username}!
                </h1>

                {/* Report Section */}
                <div className="max-w-5xl mx-auto bg-slate-100 dark:bg-slate-800 shadow-lg p-6 rounded-lg mb-8 text-center">
                    {loading ? (
                        <Loading size="lg" />
                    ) : error ? (
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    ) : report ? (
                        report.evaluations.length > 0 ? (
                            <div>
                                <h2 className="text-xl font-bold mb-2">Your Performance Report</h2>
                                <div className="my-2">{renderStars(report.averageScore)}</div>
                                <p className="mt-2 text-slate-600 dark:text-slate-300">
                                    {getPerformanceMessage(report.averageScore)}
                                </p>
                            </div>
                        ) : (
                            <p className="text-slate-600 dark:text-slate-300">
                                You don't have any evaluations yet. Please wait until you've been evaluated.
                            </p>
                        )
                    ) : (
                        <p className="text-slate-600 dark:text-slate-300">No report available.</p>
                    )}
                </div>

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
                            <p className="text-slate-700 dark:text-slate-300">View and manage your evaluations.</p>
                        </div>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
