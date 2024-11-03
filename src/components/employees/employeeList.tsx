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
import EmployeeCard from './cards/employeeCard';

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
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
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
                        <div className="flex flex-wrap justify-center max-w-5xl mx-auto">
                            {employees.map((employee) => (
                                <EmployeeCard
                                    key={employee._id}
                                    employee={employee}
                                    onEvaluate={handleEvaluationClick}
                                    onView={(id) => navigate(`/employees/${id}/evaluations`)}
                                    isCurrentUser={user?.id === employee._id}
                                />
                            ))}
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
