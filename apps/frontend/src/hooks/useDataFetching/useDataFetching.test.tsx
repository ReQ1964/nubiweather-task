import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useDataFetching } from './useDataFetching';

describe('useDataFetching', () => {
  const renderData = (data: string) => <div>{data}</div>;

  it('should render the loading spinner when data is loading', () => {
    const fetchResult = {
      data: undefined,
      error: null,
      isLoading: true,
      isError: false,
    };

    const WrapperComponent = () => useDataFetching({ fetchResult, renderData });

    render(<WrapperComponent />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render the error message when there is an error', () => {
    const fetchResult = {
      data: undefined,
      error: new Error('Error fetching data'),
      isLoading: false,
      isError: true,
    };

    const WrapperComponent = () => useDataFetching({ fetchResult, renderData });

    render(<WrapperComponent />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('should render a default error message when there is an error without a message', () => {
    const fetchResult = {
      data: undefined,
      error: null,
      isLoading: false,
      isError: true,
    };

    const WrapperComponent = () => useDataFetching({ fetchResult, renderData });

    render(<WrapperComponent />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred'),
    ).toBeInTheDocument();
  });

  it('should render the "No data available" message when there is no data', () => {
    const fetchResult = {
      data: undefined,
      error: null,
      isLoading: false,
      isError: false,
    };

    const WrapperComponent = () => useDataFetching({ fetchResult, renderData });

    render(<WrapperComponent />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render the data when fetching is successful', () => {
    const fetchResult = {
      data: 'Hello, World!',
      error: null,
      isLoading: false,
      isError: false,
    };

    const WrapperComponent = () => useDataFetching({ fetchResult, renderData });

    render(<WrapperComponent />);

    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});
