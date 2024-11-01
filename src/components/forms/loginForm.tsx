import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import Input from '../input';
import Button from '../button';
import { login } from '../../redux/thunks/authThunks';

interface FormValues {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, status } = useAppSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        const resultAction = await dispatch(login(data));

        if (login.fulfilled.match(resultAction)) {
            // If success, go to dashboard
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen p-4">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white shadow-lg rounded-lg dark:bg-slate-900 dark:border dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center">
                    Welcome to 360 Degree Feedback App
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="text"
                        placeholder="jhon"
                        label="Username:"
                        className="bg-transparent dark:bg-transparent dark:text-slate-100"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <span className="text-red-500 pt-2">{errors.username.message}</span>}

                    <Input
                        type="password"
                        placeholder="********"
                        label="Password:"
                        className="bg-transparent dark:bg-transparent dark:text-slate-100"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <span className="text-red-500 pt-2">{errors.password.message}</span>}

                    {error && (
                        <div className="text-red-500 mt-5 text-center">
                            <p>{error}</p>
                        </div>
                    )}

                    <Button type="submit" className="btn btn-primary w-full" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
