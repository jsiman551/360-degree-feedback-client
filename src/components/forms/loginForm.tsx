import React from 'react';
import Input from '../input';
import Button from '../button';

const LoginForm: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen p-4">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-slate-800 text-center">Welcome to 360 Degree Feedback App</h2>
                <form className="space-y-4">
                    <Input
                        type="email"
                        placeholder="mail@example.com"
                        label="Email:"
                        className='bg-transparent'
                        required
                    />
                    <Input
                        type="password"
                        placeholder="********"
                        label="Password:"
                        className='bg-transparent'
                        required
                    />
                    <Button type="submit" className="btn btn-primary w-full">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
