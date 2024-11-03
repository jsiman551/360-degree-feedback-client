import { forwardRef } from 'react';
import { InputProps } from '../types';

const Input = forwardRef<HTMLInputElement, InputProps>(({
    type = 'text',
    placeholder,
    label,
    variant = 'primary',
    inputSize = 'input-md',
    className = '',
    ...props
}, ref) => {
    const baseClasses = 'input input-bordered w-full';
    const variantClasses = variant ? `input-${variant}` : '';
    const sizeClasses = inputSize ? inputSize : '';

    return (
        <>
            {label && (
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
                {...props}
            />
        </>
    );
});

export default Input;
