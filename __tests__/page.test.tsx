import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '@/app/page';

describe('Page', () => {
  it('renders a specific heading', () => {
    render(<Page />);

    const heading = screen.getByText('Welcome to');
    expect(heading).toBeInTheDocument();
  });
});