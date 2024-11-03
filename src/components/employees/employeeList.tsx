import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchEmployees } from '../../redux/thunks/employeeThunks';
import Footer from '../footer';
import Header from '../header';
import Loading from '../loading';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import RegisterForm from '../forms/registerForm';
import EvaluationForm from '../forms/evaluationForm';

const EmployeeList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, token } = useAppSelector((state) => state.auth);
    const { employees, loading, error } = useAppSelector((state) => state.employees);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const modalRef = useRef<HTMLDialogElement>(null);
    const evaluationModalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if ((user?.role === 'Admin' || user?.role === 'Manager') && token) {
            dispatch(fetchEmployees(token));
        }
    }, [user, token, dispatch]);

    const handleRegisterSuccess = () => {
        if (token) {
            dispatch(fetchEmployees(token));
        }
    };

    const handleEvaluationClick = (employeeId: string) => {
        setSelectedEmployeeId(employeeId);
        evaluationModalRef.current?.showModal();
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <Header />
            <main className="flex-grow p-4">
                {loading ? (
                    <Loading size='lg' />
                ) : error ? (
                    <h1 className="text-red-600 dark:text-red-400 text-center">{error}</h1>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mt-6 mb-10 text-center">
                            Employee List
                        </h1>
                        <div className="flex mb-8 mx-auto max-w-5xl justify-center space-x-4">
                            {user?.role === 'Admin' && (
                                <Button
                                    color='primary'
                                    onClick={() => modalRef.current?.showModal()}
                                    className="mr-4 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white"
                                >
                                    Register New User
                                </Button>
                            )}
                            <Button
                                variant='solid'
                                color='accent'
                                onClick={() => navigate(-1)}
                                className="bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                            >
                                Back
                            </Button>
                        </div>
                        <div className="overflow-x-auto mx-auto max-w-5xl">
                            <table className="w-full text-left bg-slate-100 dark:bg-slate-800 shadow-lg rounded-lg">
                                <thead className="bg-slate-200 dark:bg-slate-700">
                                    <tr>
                                        <th className="p-4">ID</th>
                                        <th className="p-4">Username</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Role</th>
                                        {(user?.role === 'Admin' || user?.role === 'Manager') && (
                                            <th className="p-4">Actions</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr
                                            key={employee._id}
                                            className={`${user?.id === employee._id ? 'bg-slate-300 dark:bg-slate-600' : ''} hover:bg-slate-100 dark:hover:bg-slate-700`}
                                        >
                                            <td className="p-4">{employee._id}</td>
                                            <td className="p-4">{employee.username}</td>
                                            <td className="p-4">{employee.email}</td>
                                            <td className="p-4">{employee.role}</td>
                                            {(user?.role === 'Admin' || user?.role === 'Manager') && (
                                                <td className="p-4 flex space-x-2">
                                                    {user.id !== employee._id && (
                                                        <Button
                                                            onClick={() => handleEvaluationClick(employee._id)}
                                                            className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white"
                                                        >
                                                            Evaluate
                                                        </Button>
                                                    )}
                                                    <Button
                                                        onClick={() => navigate(`/employees/${employee._id}/evaluations`)}
                                                        variant="ghost"
                                                        color="neutral"
                                                        className="hover:underline text-blue-600 dark:text-blue-400"
                                                    >
                                                        View Evaluations
                                                    </Button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Modal for user registration */}
                        <dialog ref={modalRef} className="modal">
                            <div className="modal-box bg-slate-100 dark:bg-slate-800">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Register New User</h3>
                                <RegisterForm onRegisterSuccess={handleRegisterSuccess} onClose={() => modalRef.current?.close()} />
                                <div className="modal-action">
                                    <Button type="button" variant='outline' color='neutral' onClick={() => modalRef.current?.close()}>Cancel</Button>
                                </div>
                            </div>
                        </dialog>

                        {/* Modal for employee evaluation */}
                        <dialog ref={evaluationModalRef} className="modal">
                            <div className="modal-box bg-slate-100 dark:bg-slate-800">
                                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Evaluate Employee</h3>
                                {selectedEmployeeId && token && (
                                    <EvaluationForm
                                        employeeId={selectedEmployeeId}
                                        token={token}
                                        onClose={() => evaluationModalRef.current?.close()}
                                    />
                                )}
                                <div className="modal-action">
                                    <Button type="button" variant='outline' color='neutral' onClick={() => evaluationModalRef.current?.close()}>Cancel</Button>
                                </div>
                            </div>
                        </dialog>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default EmployeeList;
