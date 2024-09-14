import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_KEY, API_URL } from '@/constants/api';
import { FetchTodayOverviewResult } from 'shared-schemas/apiSchemas';
import { CityName, WeatherData } from 'shared-types/apiTypes';
import { ZodError } from 'zod';

const fetchWeatherData = async (city: CityName): Promise<WeatherData> => {
  const res = await axios.get(`${API_URL}current.json`, {
    params: {
      key: API_KEY,
      q: city,
    },
  });
  try {
    const parsedData = FetchTodayOverviewResult.parse(res.data);
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

export const useTodayOverviewData = (initialCity: CityName) => {
  const [currentCity, setCurrentCity] = useState<CityName>(initialCity);

  const { isLoading, isError, data, error } = useQuery<WeatherData, Error>({
    queryKey: ['overviewData', currentCity],
    queryFn: () => fetchWeatherData(currentCity),
  });

  const toggleCity = () => {
    setCurrentCity((prevCity: CityName) =>
      prevCity === 'Gliwice' ? 'Hamburg' : 'Gliwice'
    );
  };

  return {
    isLoading,
    isError,
    data,
    error,
    toggleCity,
    currentCity,
  };
};
