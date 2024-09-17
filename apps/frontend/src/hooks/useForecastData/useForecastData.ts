import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_KEY, API_URL } from '@/constants/api';
import { FetchForecastResult } from 'shared-schemas/apiSchemas';
import { ZodError } from 'zod';
import { ForecastData } from 'shared-types/apiTypes';

const fetchForecastData = async (
  city: string,
  days: number
): Promise<ForecastData> => {
  try {
    const { data } = await axios.get(`${API_URL}forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days,
        aqi: 'no',
        alerts: 'no',
      },
    });

    return FetchForecastResult.parse(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Network error:', error.message);
      throw new Error('Network error occurred while fetching forecast data.');
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

export const useForecastData = (currentCity: string, days: number) => {
  const { data, error, isLoading, isError } = useQuery<ForecastData, Error>({
    queryKey: ['forecastData', currentCity, days],
    queryFn: () => fetchForecastData(currentCity, days),
  });

  return {
    data,
    error,
    isLoading,
    isError,
  };
};
