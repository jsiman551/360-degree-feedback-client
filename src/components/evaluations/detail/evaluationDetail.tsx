import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchEvaluationById } from '../../../redux/thunks/evaluationThunks';
import Header from '../../header';
import Footer from '../../footer';
import Loading from '../../loading';
import { FaStar } from 'react-icons/fa';
import Button from '../../button';

const EvaluationDetail: React.FC = () => {
    const navigate = useNavigate();
    const { evaluationId } = useParams<{ evaluationId: string }>();
    const dispatch = useAppDispatch();
    const { evaluation, loading, error } = useAppSelector((state) => state.evaluations);
    const { token } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (evaluationId && token) {
            dispatch(fetchEvaluationById({ evaluationId, token }));
        }
    }, [evaluationId, token, dispatch]);

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
                        <div className='max-w-5xl mx-auto'>
                            <Button
                                variant='solid'
                                color='accent'
                                onClick={() => navigate(-1)}
                                className='mb-8'
                            >
                                Back
                            </Button>
                        </div>
                        <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-lg">
                            <h1 className="text-2xl font-bold text-center mb-4">Evaluation Details</h1>
                            {evaluation && (
                                <>
                                    <p className="text-lg font-semibold">Evaluator: {evaluation.evaluator.username} ({evaluation.evaluator.role})</p>
                                    <p className='flex items-center'><span className='mr-1'>Score:</span> {renderStars(evaluation.score)}</p>
                                    <p>Comments: {evaluation.comments}</p>
                                    <p>Date: {new Date(evaluation.date).toLocaleDateString()}</p>

                                    <h2 className="text-xl font-semibold mt-6">Feedbacks</h2>
                                    {evaluation.feedbacks.length > 0 ? (
                                        <ul className="space-y-4 mt-4">
                                            {evaluation.feedbacks.map((feedback) => (
                                                <li key={feedback._id} className="p-4 bg-gray-100 rounded-lg shadow">
                                                    <p className="font-semibold">Feedback by User ID: {feedback.user}</p>
                                                    <p>Score: {renderStars(feedback.score)}</p>
                                                    <p>Feedback Text: {feedback.feedbackText}</p>
                                                    <p>Date: {new Date(feedback.date).toLocaleDateString()}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 mt-4">No feedback available for this evaluation.</p>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default EvaluationDetail;
