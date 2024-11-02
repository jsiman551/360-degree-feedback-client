import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchEmployeeEvaluations } from '../../redux/thunks/evaluationThunks';
import Header from '../header';
import Footer from '../footer';
import Loading from '../loading';
import { FaStar } from 'react-icons/fa';
import Button from '../button';

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

    // Lets take employee from first evaluation
    const employee = evaluations[0]?.employee;

    // Generate Stars according to score
    const renderStars = (score: number) => {
        return Array.from({ length: score }, (_, index) => (
            <FaStar key={index} className="text-yellow-500 inline-block" />
        ));
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow p-4">
                {loading ? (
                    <Loading size="lg" />
                ) : error ? (
                    <p className="text-red-600 text-center">{error}</p>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-center mb-6">
                            Evaluations for {employee ? employee.username : 'Employee'}
                        </h1>
                        <div className='mx-auto max-w-5xl'>
                            <Button
                                variant='solid'
                                color='accent'
                                onClick={() => navigate(-1)}
                                className='mb-3'
                            >
                                Back
                            </Button>
                            {evaluations.length > 0 ? <ul className="space-y-4">
                                {evaluations.map((evaluation) => (
                                    <li key={evaluation._id} className="p-4 bg-white shadow-md rounded-lg">
                                        <p className="text-lg font-semibold">
                                            Evaluator: {evaluation.evaluator.username} ({evaluation.evaluator.role})
                                        </p>
                                        <p className='flex items-center'><span className='mr-1'>Score:</span> {renderStars(evaluation.score)}</p>
                                        <p>Comments: {evaluation.comments}</p>
                                        <p>Date: {new Date(evaluation.date).toLocaleDateString()}</p>
                                    </li>
                                ))}
                            </ul> : <p className="text-red-600 text-center">No evaluations yet</p>
                            }
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default EvaluationList;
