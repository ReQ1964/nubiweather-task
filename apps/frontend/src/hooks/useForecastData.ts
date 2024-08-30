import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_KEY, API_URL } from '../constants/api';
import { CityName, ForecastData } from 'shared-types/apiTypes';
import { FetchForecastResult } from 'shared-schemas/apiSchemas';

const fetchForecastData = async (city: CityName, days: number) => {
  const res = await axios.get(`${API_URL}forecast.json`, {
    params: {
      key: API_KEY,
      q: city,
      days: days,
      aqi: 'no',
      alerts: 'no',
    },
  });

  const parsedData = FetchForecastResult.parse(res.data);
  console.log(parsedData);
  return parsedData;
};

export const useForecastData = (currentCity: CityName, days: number) => {
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
