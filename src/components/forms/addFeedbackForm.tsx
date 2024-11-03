import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addFeedback } from '../../api';
import Button from '../button';
import Input from '../input';

interface AddFeedbackFormProps {
    evaluationId: string;
    token: string;
    onClose: () => void;
    onFeedbackAdded: () => void;
}

interface AddFeedbackFormData {
    score: number;
    feedbackText: string;
}

const AddFeedbackForm: React.FC<AddFeedbackFormProps> = ({ evaluationId, token, onClose, onFeedbackAdded }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddFeedbackFormData>();
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<AddFeedbackFormData> = async (data) => {
        setLoading(true);
        setFormError('');
        try {
            data.score = Number(data.score);
            await addFeedback({ evaluationId, ...data }, token);
            onFeedbackAdded();
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
                <label className="label text-slate-800 dark:text-slate-100">Feedback</label>
                <textarea
                    {...register('feedbackText', { required: 'Feedback is required' })}
                    className="textarea textarea-bordered w-full dark:bg-slate-700 dark:text-slate-200"
                    disabled={loading}
                    rows={4}
                />
                {errors.feedbackText && <p className="text-red-500 text-sm">{errors.feedbackText.message}</p>}
            </div>
            <Button type="submit" color="primary" className="w-full bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700" disabled={loading}>
                {loading ? 'Submitting...' : 'Add Feedback'}
            </Button>
        </form>
    );
};

export default AddFeedbackForm;
