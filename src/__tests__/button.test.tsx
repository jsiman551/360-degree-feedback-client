import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/button';

describe('Button Component', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click Me</Button>);
        const button = screen.getByText('Click Me');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('btn');
        expect(button).not.toHaveClass('btn-solid');
        expect(button).toHaveClass('btn-primary');
        expect(button).toHaveClass('btn-md');
    });

    it('applies correct variant class', () => {
        render(<Button variant="outline" color="secondary">Outline Button</Button>);
        const button = screen.getByText('Outline Button');
        expect(button).toHaveClass('btn-outline');
        expect(button).toHaveClass('btn-secondary');
    });

    it('applies correct size class', () => {
        render(<Button size="lg">Large Button</Button>);
        const button = screen.getByText('Large Button');
        expect(button).toHaveClass('btn-lg');
    });

    it('accepts additional class names', () => {
        render(<Button className="custom-class">Custom Class Button</Button>);
        const button = screen.getByText('Custom Class Button');
        expect(button).toHaveClass('custom-class');
    });

    it('triggers onClick event', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        const button = screen.getByText('Click Me');

        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
