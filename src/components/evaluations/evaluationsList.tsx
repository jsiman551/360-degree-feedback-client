import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchEmployeeEvaluations } from '../../redux/thunks/evaluationThunks';
import Header from '../header';
import Footer from '../footer';
import Loading from '../loading';
import Button from '../button';
import { renderStars } from '../../utils/helpers';

const EvaluationList: React.FC = () => {
    const navigate = useNavigate();
    const { employeeId } = useParams<{ employeeId: string }>();
    const dispatch = useAppDispatch();
    const { evaluations, loading, error } = useAppSelector((state) => state.evaluations);
    const { token } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (employeeId && token) {
            dispatch(fetchEmployeeEvaluations({ employeeId, token }));
        }
    }, [employeeId, token, dispatch]);

    const employee = evaluations[0]?.employee;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
            <Header />
            <main className="flex-grow p-4">
                {loading ? (
                    <Loading size="lg" />
                ) : error ? (
                    <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-center mb-6">
                            Evaluations for {employee ? employee.username : 'Employee'}
                        </h1>
                        <div className="mx-auto max-w-5xl">
                            <Button
                                variant="solid"
                                color="accent"
                                onClick={() => navigate(-1)}
                                className="mb-8 bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                            >
                                Back
                            </Button>
                            {evaluations.length > 0 ? (
                                <ul className="space-y-4">
                                    {evaluations.map((evaluation) => (
                                        <li
                                            key={evaluation._id}
                                            className="p-4 bg-slate-100 dark:bg-slate-800 shadow-md rounded-lg text-slate-800 dark:text-slate-100"
                                        >
                                            <p className="text-lg font-semibold">
                                                Evaluator: {evaluation.evaluator.username} ({evaluation.evaluator.role})
                                            </p>
                                            <p className="flex items-center">
                                                <span className="mr-1">Score:</span> {renderStars(evaluation.score)}
                                            </p>
                                            <p>Comments: {evaluation.comments}</p>
                                            <p>Date: {new Date(evaluation.date).toLocaleDateString()}</p>
                                            <Button
                                                onClick={() => navigate(`/evaluations/${evaluation._id}`)}
                                                className="mt-4 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white"
                                            >
                                                View Details
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-red-600 dark:text-red-400 text-center">No evaluations yet</p>
                            )}
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default EvaluationList;
