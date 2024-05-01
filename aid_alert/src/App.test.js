import React from 'react';
import { render, screen, test } from '@testing-library/react'; // Import the 'test' function
import { expect } from '@testing-library/jest-dom/extend-expect'; // Import the expect function
import App from './App';

test('renders learn react link', () => {
	render(<App />);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
