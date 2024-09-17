import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_KEY, API_URL } from '@/constants/api';
import { FetchTodayOverviewResult } from 'shared-schemas/apiSchemas';
import { WeatherData } from 'shared-types/apiTypes';
import { ZodError } from 'zod';

const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const { data } = await axios.get(`${API_URL}current.json`, {
      params: {
        key: API_KEY,
        q: city,
      },
    });

    return FetchTodayOverviewResult.parse(data);
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

export const useTodayOverviewData = (initialCity: string) => {
  const [currentCity, setCurrentCity] = useState<string>(initialCity);

  const { data, error, isLoading, isError } = useQuery<WeatherData, Error>({
    queryKey: ['overviewData', currentCity],
    queryFn: () => fetchWeatherData(currentCity),
  });

  return {
    data,
    error,
    isLoading,
    isError,
    setCurrentCity,
    currentCity,
  };
};
