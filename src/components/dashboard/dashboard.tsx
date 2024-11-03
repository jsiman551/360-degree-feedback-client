import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchEmployeeReport } from '../../redux/thunks/reportThunks';
import Footer from '../footer';
import Header from '../header';
import Loading from '../loading';
import { Link } from 'react-router-dom';

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
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow p-4 bg-slate-100 dark:bg-slate-900">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-10 text-center">
                    Welcome, {user?.username}!
                </h1>

                {/* Report Section */}
                <div className="max-w-5xl mx-auto bg-white shadow-lg p-6 rounded-lg dark:bg-slate-800 mb-8">
                    {loading ? (
                        <Loading size="lg" />
                    ) : error ? (
                        <p className="text-red-600 text-center">{error}</p>
                    ) : report ? (
                        report.evaluations.length > 0 ? (
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Your Performance Report</h2>
                                <p className="text-lg font-semibold">
                                    Average Score: {report.averageScore}
                                </p>
                                <p className="mt-2 text-slate-600 dark:text-slate-300">
                                    {getPerformanceMessage(report.averageScore)}
                                </p>
                            </div>
                        ) : (
                            <p className="text-center text-slate-700 dark:text-slate-300">
                                You don't have any evaluations yet, so you currently have no score. Please wait until you've been evaluated.
                            </p>
                        )
                    ) : (
                        <p className="text-center">No report available.</p>
                    )}
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(user?.role === "Admin" || user?.role === "Manager") && (
                        <Link to="/employees">
                            <div className="card bg-white shadow-lg dark:bg-slate-800 transition-transform duration-200 transform hover:scale-105 hover:bg-blue-200 dark:hover:bg-blue-600">
                                <div className="card-body">
                                    <h2 className="card-title">Employees</h2>
                                    <p>Manage your employees.</p>
                                </div>
                            </div>
                        </Link>
                    )}
                    <Link to={`/employees/${user?.id}/evaluations`}>
                        <div className="card bg-white shadow-lg dark:bg-slate-800 transition-transform duration-200 transform hover:scale-105 hover:bg-blue-200 dark:hover:bg-blue-600">
                            <div className="card-body">
                                <h2 className="card-title">Evaluations</h2>
                                <p>View and manage your evaluations.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
