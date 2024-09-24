import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ZodError, ZodSchema } from 'zod';

const fetchData = async <T,>(
  city: string,
  url: string,
  schema: ZodSchema<T>,
): Promise<T> => {
  try {
    const response = await axios.get(url, {
      params: {
        city,
      },
    });

    return schema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Network error:', error.message);
      throw new Error('Network error occurred while fetching weather data.');
    }

    if (error instanceof ZodError) {
      const path = error.issues
        .map((issue) => issue.path.join(' -> '))
        .join(', ');
      const formattedError = `Zod validation error: ${error.message} | Path: ${path}`;
      console.error(formattedError);
      throw new Error(formattedError);
    }

    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

export const useApiData = <T,>(
  city: string,
  url: string,
  schema: ZodSchema<T>,
) => {
  const { data, error, isLoading, isError } = useQuery<T, Error>({
    queryKey: ['currentWeatherData', city],
    queryFn: () => fetchData<T>(city, url, schema),
  });

  return {
    data,
    error,
    isLoading,
    isError,
  };
};
