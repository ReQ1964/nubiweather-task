import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_KEY, API_URL } from '../constants/api';
import { CityName } from 'shared-types/apiTypes';

const fetchForecastData = async (city: CityName, days: number) => {
  const res = await axios.get(`${API_URL}forecast.json`, {
    params: {
      key: API_KEY,
      q: city.currentCity,
      days: days,
      aqi: 'no',
      alerts: 'no',
    },
  });
  return res.data;
};

export const useForecastData = (currentCity: CityName, days: number) => {
  const { isLoading, isError, data, error } = useQuery<any, Error>({
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
