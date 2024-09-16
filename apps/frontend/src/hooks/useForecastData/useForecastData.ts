import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_KEY, API_URL } from '@/constants/api';
import { FetchForecastResult } from 'shared-schemas/apiSchemas';
import { ZodError } from 'zod';
import { ForecastData } from 'shared-types/apiTypes';

const fetchForecastData = async (city: string, days: number) => {
  const res = await axios.get(`${API_URL}forecast.json`, {
    params: {
      key: API_KEY,
      q: city,
      days: days,
      aqi: 'no',
      alerts: 'no',
    },
  });
  try {
    const parsedData = FetchForecastResult.parse(res.data);
    return parsedData;
  } catch (error) {
    if (error instanceof ZodError) {
      const path = error.issues[0].path.join(' -> ');
      const formattedError = `Error: ${error.issues[0].message} | [${path}]`;

      console.error('Zod validation error:', formattedError);
      throw new Error(formattedError);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const useForecastData = (currentCity: string, days: number) => {
  const { isLoading, isError, data, error } = useQuery<ForecastData, Error>({
    queryKey: ['forecastData', currentCity, days],
    queryFn: () => fetchForecastData(currentCity, days),
  });

  return {
    isLoading,
    isError,
    error,
    data,
  };
};
