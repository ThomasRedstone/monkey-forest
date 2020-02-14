import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders enter forest link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Enter, if you dare/i);
  expect(linkElement).toBeInTheDocument();
});
