import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CurrentWeatherSchema } from 'shared-schemas/apiSchemas';
import { CurrentWeatherSchemaType } from 'shared-types/apiTypes';
import { ZodError } from 'zod';

const fetchCurrentWeatherData = async (
  city: string,
): Promise<CurrentWeatherSchemaType> => {
  try {
    const response = await axios.get('http://localhost:5000/currentWeather', {
      params: {
        city,
      },
    });

    return CurrentWeatherSchema.parse(response.data);
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

export const useCurrentWeatherData = (city: string) => {
  const { data, error, isLoading, isError } = useQuery<
    CurrentWeatherSchemaType,
    Error
  >({
    queryKey: ['currentWeatherData', city],
    queryFn: () => fetchCurrentWeatherData(city),
  });

  return {
    data,
    error,
    isLoading,
    isError,
  };
};
