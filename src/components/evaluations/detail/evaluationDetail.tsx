import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchEvaluationById } from '../../../redux/thunks/evaluationThunks';
import Header from '../../header';
import Footer from '../../footer';
import Loading from '../../loading';
import Button from '../../button';
import UpdateEvaluationForm from '../../forms/updateEvaluationForm';
import AddFeedbackForm from '../../forms/addFeedbackForm';
import { renderStars } from '../../../utils/helpers';

const EvaluationDetail: React.FC = () => {
    const navigate = useNavigate();
    const { evaluationId } = useParams<{ evaluationId: string }>();
    const dispatch = useAppDispatch();
    const { evaluation, loading, error } = useAppSelector((state) => state.evaluations);
    const { token, user } = useAppSelector((state) => state.auth);

    const [selectedEvaluationId, setSelectedEvaluationId] = useState<string | null>(null);
    const editModalRef = useRef<HTMLDialogElement>(null);
    const feedbackModalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (evaluationId && token) {
            dispatch(fetchEvaluationById({ evaluationId, token }));
        }
    }, [evaluationId, token, dispatch]);

    const handleEditClick = () => {
        if (user?.id === evaluation?.evaluator._id) {
            setSelectedEvaluationId(evaluationId || null);
            editModalRef.current?.showModal();
        }
    };

    const handleAddFeedbackClick = () => {
        feedbackModalRef.current?.showModal();
    };

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
                        <div className="max-w-5xl mx-auto">
                            <Button
                                variant="solid"
                                color="accent"
                                onClick={() => navigate(-1)}
                                className="mb-8 bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                            >
                                Back
                            </Button>
                        </div>
                        <div className="max-w-5xl mx-auto bg-slate-100 dark:bg-slate-800 p-6 shadow-md rounded-lg">
                            <h1 className="text-2xl font-bold text-center mb-4">Evaluation Details</h1>
                            {evaluation && (
                                <>
                                    <p className="text-lg font-semibold">Evaluator: {evaluation.evaluator.username} ({evaluation.evaluator.role})</p>
                                    <p className="flex items-center">
                                        <span className="mr-1">Score:</span> {renderStars(evaluation.score)}
                                    </p>
                                    <p>Comments: {evaluation.comments}</p>
                                    <p>Date: {new Date(evaluation.date).toLocaleDateString()}</p>

                                    {/* Feedback Section */}
                                    <div className="mt-6">
                                        <h2 className="text-xl font-semibold">Feedbacks</h2>
                                        {evaluation.feedbacks && evaluation.feedbacks.length > 0 ? (
                                            <ul className="space-y-4 mt-4">
                                                {evaluation.feedbacks.map((feedback) => (
                                                    <li
                                                        key={feedback._id}
                                                        className="border rounded-md p-4 bg-slate-200 dark:bg-slate-700"
                                                    >
                                                        <p>Commentor: {feedback.commentor}</p>
                                                        <p className="flex items-center">
                                                            <span className="mr-1">Score:</span> {renderStars(feedback.score)}
                                                        </p>
                                                        <p>Feedback: {feedback.feedbackText}</p>
                                                        <p>Date: {new Date(feedback.date).toLocaleDateString()}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="mt-4 text-gray-500 dark:text-gray-400">No feedbacks available.</p>
                                        )}
                                    </div>

                                    <Button
                                        variant="solid"
                                        color="primary"
                                        onClick={handleAddFeedbackClick}
                                        className="mt-4 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white"
                                    >
                                        Add Feedback
                                    </Button>

                                    {user?.id === evaluation?.evaluator._id && (
                                        <Button
                                            variant="solid"
                                            color="primary"
                                            onClick={handleEditClick}
                                            className="mt-4 ml-2 bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white"
                                        >
                                            Edit Evaluation
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}
            </main>
            <Footer />

            {/* Modal for editing evaluation */}
            <dialog ref={editModalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Evaluation</h3>
                    {selectedEvaluationId && evaluation && token && (
                        <UpdateEvaluationForm
                            evaluationId={selectedEvaluationId}
                            initialScore={evaluation.score}
                            initialComments={evaluation.comments}
                            token={token}
                            onClose={() => editModalRef.current?.close()}
                            onUpdateSuccess={() => dispatch(fetchEvaluationById({ evaluationId: selectedEvaluationId, token }))}
                        />
                    )}
                    <div className="modal-action">
                        <Button
                            type="button"
                            variant="outline"
                            color="neutral"
                            onClick={() => editModalRef.current?.close()}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </dialog>

            {/* Modal for adding feedback */}
            <dialog ref={feedbackModalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Feedback</h3>
                    {evaluationId && token && (
                        <AddFeedbackForm
                            evaluationId={evaluationId}
                            token={token}
                            onClose={() => feedbackModalRef.current?.close()}
                            onFeedbackAdded={() => dispatch(fetchEvaluationById({ evaluationId, token }))}
                        />
                    )}
                    <div className="modal-action">
                        <Button
                            type="button"
                            variant="outline"
                            color="neutral"
                            onClick={() => feedbackModalRef.current?.close()}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default EvaluationDetail;
