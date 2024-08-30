import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import WeatherOverview from './components/WeatherOverview';
import axios from 'axios';
import { API_KEY, API_URL } from './constants/api';

export type CityName = 'Gliwice' | 'Hamburg';

interface WeatherData {
  location: {
    name: CityName;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: string;
    condition: {
      text: string;
      icon: string;
    };
  };
}

const fetchWeatherData = async (city: CityName): Promise<WeatherData> => {
  const res = await axios.get(`${API_URL}current.json`, {
    params: {
      key: API_KEY,
      q: city,
      aqi: 'no',
    },
  });
  return res.data;
};

function App(): JSX.Element {
  const [currentCity, setCurrentCity] = useState<CityName>('Gliwice');

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [currentCity],
    queryFn: () => fetchWeatherData(currentCity),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message || 'An unexpected error occurred'}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <main>
      <WeatherOverview
        city={data.location.name}
        country={data.location.country}
        localtime={data.location.localtime}
        temperature={data.current.temp_c}
        condition={data.current.condition}
        setCurrentCity={setCurrentCity}
      />
    </main>
  );
}

export default App;
