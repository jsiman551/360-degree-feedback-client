import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchEmployees } from '../../redux/thunks/employeeThunks';
import Footer from '../footer';
import Header from '../header';
import Loading from '../loading';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import RegisterForm from '../forms/registerForm';

const EmployeeList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, token } = useAppSelector((state) => state.auth);
    const { employees, loading, error } = useAppSelector((state) => state.employees);
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (user?.role === 'Admin' || user?.role === 'Manager') {
            if (token) {
                dispatch(fetchEmployees(token));
            }
        }
    }, [user, token, dispatch]);

    const handleRegisterSuccess = () => {
        if (token) {
            dispatch(fetchEmployees(token));
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow p-4 bg-slate-100 dark:bg-slate-900">
                {loading ? (
                    <Loading size='lg' />
                ) : error ? (
                    <h1 className="text-red-600 text-center">{error}</h1>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-10 text-center">
                            Employee List
                        </h1>
                        <div className="overflow-x-auto mx-auto max-w-5xl">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee._id} className={user?.id === employee._id ? 'bg-base-200' : ''}>
                                            <td>{employee._id}</td>
                                            <td>{employee.username}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex mt-8 mx-auto max-w-5xl">
                            {user?.role === 'Admin' && (
                                <Button
                                    color='primary'
                                    onClick={() => modalRef.current?.showModal()}
                                    className='mr-4'
                                >
                                    Register New User
                                </Button>
                            )}
                            <Button
                                color="neutral"
                                variant='outline'
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </Button>
                        </div>

                        {/* Modal for user registration */}
                        <dialog ref={modalRef} className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Register New User</h3>
                                <RegisterForm onRegisterSuccess={handleRegisterSuccess} onClose={() => modalRef.current?.close()} />
                                <div className="modal-action">
                                    <Button type="button" variant='outline' color='neutral' onClick={() => modalRef.current?.close()}>Cancel</Button>
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
