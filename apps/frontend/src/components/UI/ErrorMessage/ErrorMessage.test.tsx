import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  it('should render children', () => {
    render(<ErrorMessage>Error message</ErrorMessage>);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
