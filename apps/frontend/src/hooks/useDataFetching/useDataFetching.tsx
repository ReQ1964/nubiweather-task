import LoadingSpinner from '@/assets/icons/LoadingSpinner';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';

type FetchResult<T> = {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
};

type RenderFunction<T> = (data: T) => React.ReactNode;

export const useDataFetching = <T,>({
  fetchResult,
  renderData,
  loadingComponent = <LoadingSpinner />,
  errorClassName = 'h-full min-h-[120px]',
  loadingClassName = 'flex items-center justify-center',
}: {
  fetchResult: FetchResult<T>;
  renderData: RenderFunction<T>;
  loadingComponent?: React.ReactNode;
  errorClassName?: string;
  loadingClassName?: string;
}) => {
  const { data, error, isLoading, isError } = fetchResult;

  if (isLoading) {
    return <div className={loadingClassName}>{loadingComponent}</div>;
  }

  if (isError) {
    return (
      <ErrorMessage className={errorClassName}>
        {error?.message || 'An unexpected error occurred'}
      </ErrorMessage>
    );
  }

  if (!data) {
    return (
      <ErrorMessage className={errorClassName}>No data available</ErrorMessage>
    );
  }

  return renderData(data);
};
