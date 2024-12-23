import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from '../components/header';

// Create a mock store
const mockStore = configureStore();

// Define the shape of your initial state
interface InitialState {
    user?: {
        name: string;
        isLoggedIn: boolean;
    };
}

// Helper function to render with Redux
const renderWithRedux = (component: React.ReactNode, { initialState }: { initialState?: InitialState } = {}) => {
    const store = mockStore(initialState);
    return {
        ...render(<Provider store={store}><BrowserRouter>{component}</BrowserRouter></Provider>),
        store,
    };
};

describe('Header Component', () => {
    it('renders correctly', () => {
        renderWithRedux(<Header />);

        // Verify that the header text is rendered
        expect(screen.getByText('360 Degree Feedback')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });
});
