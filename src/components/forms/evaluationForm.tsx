import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerEvaluation } from '../../api';
import Button from '../button';
import Input from '../input';
import { useNavigate } from 'react-router-dom';
import { EvaluationFormProps, EvaluationFormData } from '../../types';

const EvaluationForm: React.FC<EvaluationFormProps> = ({ employeeId, token, onClose }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<EvaluationFormData>();
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<EvaluationFormData> = async (data) => {
        setLoading(true);
        setFormError('');
        try {
            data.score = Number(data.score); // Convert score to number type
            await registerEvaluation({ employeeId, ...data }, token);
            onClose();
            navigate(`/employees/${employeeId}/evaluations`);
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
                />
                {errors.score && <p className="text-red-500 dark:text-red-400 text-sm">{errors.score.message}</p>}
            </div>
            <div>
                <label className="label text-slate-800 dark:text-slate-100">Comments</label>
                <textarea
                    {...register('comments', { required: 'Comments are required' })}
                    className="textarea textarea-bordered w-full"
                    disabled={loading}
                />
                {errors.comments && <p className="text-red-500 dark:text-red-400 text-sm">{errors.comments.message}</p>}
            </div>
            <Button type="submit" color='primary' className="w-full" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Evaluation'}
            </Button>
        </form>
    );
};

export default EvaluationForm;
