import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../components/footer';

describe('Footer Component', () => {
    it('renders correctly', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        // Check for the copyright text
        const copyrightText = screen.getByText(/Copyright © \d{4} - All rights reserved/i);
        expect(copyrightText).toBeInTheDocument();

        // Check for the GitHub link
        const githubLink = screen.getByLabelText(/GitHub/i);
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', 'https://github.com/jsiman551');

        // Check for the LinkedIn link
        const linkedInLink = screen.getByLabelText(/LinkedIn/i);
        expect(linkedInLink).toBeInTheDocument();
        expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jose-angel-simancas-lopez/');
    });

    it('contains social media links that open in a new tab', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        const githubLink = screen.getByLabelText(/GitHub/i);
        const linkedInLink = screen.getByLabelText(/LinkedIn/i);

        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
        expect(linkedInLink).toHaveAttribute('target', '_blank');
        expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
