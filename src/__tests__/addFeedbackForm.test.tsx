import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AddFeedbackForm from '../components/forms/addFeedbackForm';

describe('AddFeedbackForm', () => {
    const mockOnClose = vi.fn();
    const mockOnFeedbackAdded = vi.fn();

    beforeEach(() => {
        render(
            <AddFeedbackForm
                evaluationId="123"
                token="dummy-token"
                onClose={mockOnClose}
                onFeedbackAdded={mockOnFeedbackAdded}
            />
        );
    });

    it('renders correctly', () => {
        expect(screen.getByLabelText(/Score/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Feedback/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Add Feedback/i })).toBeInTheDocument();
    });

    it('validates required fields', async () => {
        fireEvent.click(screen.getByRole('button', { name: /Add Feedback/i }));

        expect(await screen.findByText(/Score is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/Feedback is required/i)).toBeInTheDocument();
    });
});
