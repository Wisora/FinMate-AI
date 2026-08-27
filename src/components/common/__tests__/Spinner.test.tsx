import React from 'react';
import { render, screen } from './test-utils';
import { Spinner } from '../Spinner';

describe('Spinner Component', () => {
  test('renders status role and default screen-reader text', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders custom accessible label when provided', () => {
    render(<Spinner label="Processing payment..." />);

    expect(screen.getByText('Processing payment...')).toBeInTheDocument();
  });

  test('applies custom size and container classes', () => {
    render(<Spinner size="lg" className="my-custom-margin" />);

    const container = screen.getByRole('status');
    expect(container).toHaveClass('my-custom-margin');
  });
});
