import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchEvaluationById } from '../../../redux/thunks/evaluationThunks';
import Header from '../../header';
import Footer from '../../footer';
import Loading from '../../loading';
import { FaStar } from 'react-icons/fa';
import Button from '../../button';
import UpdateEvaluationForm from '../../forms/updateEvaluationForm';

const EvaluationDetail: React.FC = () => {
    const navigate = useNavigate();
    const { evaluationId } = useParams<{ evaluationId: string }>();
    const dispatch = useAppDispatch();
    const { evaluation, loading, error } = useAppSelector((state) => state.evaluations);
    const { token, user } = useAppSelector((state) => state.auth);

    const [selectedEvaluationId, setSelectedEvaluationId] = useState<string | null>(null);
    const editModalRef = useRef<HTMLDialogElement>(null);

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

    const handleEditClick = () => {
        if (user?.id === evaluation?.evaluator._id) {
            setSelectedEvaluationId(evaluationId || null);
            editModalRef.current?.showModal();
        }
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
                        <div className="max-w-5xl mx-auto">
                            <Button
                                variant="solid"
                                color="accent"
                                onClick={() => navigate(-1)}
                                className="mb-8"
                            >
                                Back
                            </Button>
                        </div>
                        <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-lg">
                            <h1 className="text-2xl font-bold text-center mb-4">Evaluation Details</h1>
                            {evaluation && (
                                <>
                                    <p className="text-lg font-semibold">Evaluator: {evaluation.evaluator.username} ({evaluation.evaluator.role})</p>
                                    <p className="flex items-center"><span className="mr-1">Score:</span> {renderStars(evaluation.score)}</p>
                                    <p>Comments: {evaluation.comments}</p>
                                    <p>Date: {new Date(evaluation.date).toLocaleDateString()}</p>

                                    {user?.id === evaluation?.evaluator._id ? <Button
                                        variant="solid"
                                        color="primary"
                                        onClick={handleEditClick}
                                        className="mt-4"
                                    >
                                        Edit Evaluation
                                    </Button> : null}
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
                        <Button type="button" variant="outline" color="neutral" onClick={() => editModalRef.current?.close()}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default EvaluationDetail;
