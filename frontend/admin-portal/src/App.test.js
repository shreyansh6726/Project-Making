import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the admin dashboard heading', () => {
  render(<App />);

  expect(screen.getByText(/client entries dashboard/i)).toBeInTheDocument();
});