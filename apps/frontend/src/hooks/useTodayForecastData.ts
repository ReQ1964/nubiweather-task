import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_KEY, API_URL } from '../constants/api';
import { z } from 'zod';

const FetchWeatherResult = z.object({
  location: z.object({
    name: z.enum(['Gliwice', 'Hamburg']),
    country: z.string(),
    localtime: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
    }),
  }),
});

export type CityName = z.infer<typeof FetchWeatherResult>['location']['name'];
export type WeatherData = z.infer<typeof FetchWeatherResult>;

const fetchWeatherData = async (city: CityName): Promise<WeatherData> => {
  const res = await axios.get(`${API_URL}current.json`, {
    params: {
      key: API_KEY,
      q: city,
      aqi: 'no',
    },
  });
  const parsedData = FetchWeatherResult.parse(res.data);
  return parsedData;
};

export const useTodayForecastData = (initialCity: CityName) => {
  const [currentCity, setCurrentCity] = useState<CityName>(initialCity);

  const { isLoading, isError, data, error } = useQuery<WeatherData, Error>({
    queryKey: [currentCity],
    queryFn: () => fetchWeatherData(currentCity),
  });

  const toggleCity = () => {
    setCurrentCity((prevCity) =>
      prevCity === 'Gliwice' ? 'Hamburg' : 'Gliwice'
    );
  };

  return {
    isLoading,
    isError,
    data,
    error,
    toggleCity,
  };
};
