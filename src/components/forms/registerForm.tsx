import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux';
import { registerUser } from '../api';
import Button from '../button';

interface FormData {
    username: string;
    email: string;
    password: string;
    role: 'Admin' | 'Manager' | 'Employee';
}

interface RegisterFormProps {
    onRegisterSuccess: () => void;
    onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onClose }) => {
    const { token } = useAppSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        setFormError('');
        setLoading(true);
        try {
            const result = await registerUser(formData, token || '');
            if (result.success) {
                onClose();
                onRegisterSuccess();
            }
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
            {formError && <p className="text-red-600">{formError}</p>}
            <div>
                <label className="label text-slate-800 dark:text-slate-100">Username</label>
                <input
                    type="text"
                    {...register('username', { required: 'Username is required' })}
                    className="input input-bordered w-full"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
            <div>
                <label className="label text-slate-800 dark:text-slate-100">Email</label>
                <input
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: 'Invalid email format'
                        }
                    })}
                    className="input input-bordered w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
                <label className="label text-slate-800 dark:text-slate-100">Password</label>
                <input
                    type="password"
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                    className="input input-bordered w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div>
                <label className="label text-slate-800 dark:text-slate-100">Role</label>
                <select
                    {...register('role', { required: 'Role is required' })}
                    className="select select-bordered w-full"
                >
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>
            <Button type="submit" color="primary" className="w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Register User'}
            </Button>
        </form>
    );
};

export default RegisterForm;
