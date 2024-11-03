import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { updateEvaluation } from '../../api';
import Button from '../button';
import Input from '../input';

interface UpdateEvaluationFormProps {
    evaluationId: string;
    initialScore: number;
    initialComments: string;
    token: string;
    onClose: () => void;
    onUpdateSuccess: () => void;
}

export interface UpdateEvaluationFormData {
    score: number;
    comments: string;
}

const UpdateEvaluationForm: React.FC<UpdateEvaluationFormProps> = ({
    evaluationId,
    initialScore,
    initialComments,
    token,
    onClose,
    onUpdateSuccess
}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateEvaluationFormData>();
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        reset({
            score: initialScore,
            comments: initialComments,
        });
    }, [initialScore, initialComments, reset]);

    const onSubmit: SubmitHandler<UpdateEvaluationFormData> = async (data) => {
        setLoading(true);
        setFormError('');
        try {
            data.score = Number(data.score); // Convert score to number type
            await updateEvaluation(evaluationId, data, token);
            onUpdateSuccess(); // Callback for successful update
            onClose();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setFormError(error.message);
            } else {
                setFormError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {formError && <p className="text-red-600 dark:text-red-400">{formError}</p>}
            <div>
                <label className="label text-slate-800 dark:text-slate-100">Score</label>
                <Input
                    type="number"
                    {...register('score', {
                        required: 'Score is required',
                        min: { value: 1, message: 'Score must be at least 1' },
                        max: { value: 5, message: 'Score cannot exceed 5' }
                    })}
                    disabled={loading}
                    className="input w-full"
                />
                {errors.score && <p className="text-red-500 text-sm">{errors.score.message}</p>}
            </div>
            <div>
                <label className="label text-slate-800 dark:text-slate-100">Comments</label>
                <textarea
                    {...register('comments', { required: 'Comments are required' })}
                    className="textarea textarea-bordered w-full dark:bg-slate-700 dark:text-slate-200"
                    disabled={loading}
                />
                {errors.comments && <p className="text-red-500 text-sm">{errors.comments.message}</p>}
            </div>
            <Button type="submit" color="primary" className="w-full bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700" disabled={loading}>
                {loading ? 'Updating...' : 'Update Evaluation'}
            </Button>
        </form>
    );
};

export default UpdateEvaluationForm;
