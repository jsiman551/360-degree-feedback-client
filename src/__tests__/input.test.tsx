import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../components/input';

describe('Input Component', () => {
    it('renders correctly with default props', () => {
        render(<Input />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveClass('input input-bordered w-full input-md');
    });

    it('renders with a placeholder', () => {
        const placeholderText = 'Enter your text here';
        render(<Input placeholder={placeholderText} />);
        const inputElement = screen.getByPlaceholderText(placeholderText);
        expect(inputElement).toBeInTheDocument();
    });

    it('renders with a label', () => {
        const labelText = 'Input Label';
        render(<Input label={labelText} />);
        const labelElement = screen.getByText(labelText);
        expect(labelElement).toBeInTheDocument();
    });

    it('applies variant classes correctly', () => {
        render(<Input variant="secondary" />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveClass('input-secondary');
    });

    it('applies custom class names', () => {
        const customClass = 'custom-input-class';
        render(<Input className={customClass} />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveClass(customClass);
    });

    it('renders with a specified input size', () => {
        render(<Input inputSize="input-lg" />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveClass('input-lg');
    });

    it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Input ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
