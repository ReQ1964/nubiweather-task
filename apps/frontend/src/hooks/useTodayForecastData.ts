import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_KEY, API_URL } from '../constants/api';
import { FetchTodayForecastResult } from 'shared-schemas/apiSchemas';
import { CityName, WeatherData } from 'shared-types/apiTypes';

const fetchWeatherData = async (city: CityName): Promise<WeatherData> => {
  const res = await axios.get(`${API_URL}current.json`, {
    params: {
      key: API_KEY,
      q: city,
      aqi: 'no',
    },
  });
  const parsedData = FetchTodayForecastResult.parse(res.data);
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
