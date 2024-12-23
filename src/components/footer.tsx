import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="footer bg-slate-800 text-white items-center p-4 mt-10">
            <aside className="grid-flow-col items-center justify-self-center md:justify-self-start">
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    className="fill-current">
                    <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z" />
                </svg>
                <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center justify-self-center md:justify-self-end">
                <Link to="https://github.com/jsiman551" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current transition duration-300 hover:text-gray-300">
                        <path d="M12 .297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.26.82-.577 0-.285-.01-1.237-.015-2.246-3.338.725-4.043-1.606-4.043-1.606-.546-1.387-1.333-1.758-1.333-1.758-1.089-.743.083-.727.083-.727 1.205.085 1.838 1.237 1.838 1.237 1.071 1.83 2.809 1.303 3.493.995.107-.775.42-1.303.763-1.603-2.665-.303-5.466-1.332-5.466-5.934 0-1.313.469-2.39 1.236-3.228-.124-.303-.536-1.527.116-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.986-.398 3.003-.403 1.016.005 2.046.137 3.003.403 2.292-1.552 3.3-1.23 3.3-1.23.653 1.649.241 2.873.118 3.176.77.839 1.236 1.915 1.236 3.228 0 4.619-2.807 5.628-5.474 5.923.43.373.81 1.101.81 2.223 0 1.606-.015 2.903-.015 3.293 0 .317.22.694.825.577C20.565 22.1 24 17.603 24 12.297c0-6.627-5.373-12-12-12z" />
                    </svg>
                </Link>
                <Link to="https://www.linkedin.com/in/jose-angel-simancas-lopez/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current transition duration-300 hover:text-gray-300">
                        <path d="M19 0h-14c-2.209 0-4 1.791-4 4v16c0 2.209 1.791 4 4 4h14c2.209 0 4-1.791 4-4v-16c0-2.209-1.791-4-4-4zm-10 20h-2v-10h2v10zm-1-11.5c-.688 0-1.25-.563-1.25-1.25s.563-1.25 1.25-1.25 1.25.563 1.25 1.25-.562 1.25-1.25 1.25zm13 11.5h-2v-5.5c0-1.375-.468-2.5-1.625-2.5-1.125 0-1.75.75-1.75 1.75v6.25h-2v-10h2v1.5c.25-.375.875-1 2-1 2.25 0 3.5 1.5 3.5 4v5.5z" />
                    </svg>
                </Link>
            </nav>
        </footer>
    );
};

export default Footer;
