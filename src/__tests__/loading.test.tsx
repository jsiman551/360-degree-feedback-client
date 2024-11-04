import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../components/loading';

describe('Loading Component', () => {
    it('renders with default size', () => {
        render(<Loading />);
        const spinner = screen.getByTestId('loading-spinner');
        expect(spinner).toHaveClass('loading-md');
    });

    it('renders with custom size', () => {
        render(<Loading size="lg" />);
        const spinner = screen.getByTestId('loading-spinner');
        expect(spinner).toHaveClass('loading-lg');
    });

    it('applies additional class names', () => {
        render(<Loading className="custom-class" />);
        const container = screen.getByTestId('loading-spinner').parentElement;
        expect(container).toHaveClass('custom-class');
    });
});
