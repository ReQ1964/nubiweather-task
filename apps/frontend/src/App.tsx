import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import WeatherOverview from './components/WeatherOverview';
import axios from 'axios';
import { API_KEY, API_URL } from './constants/api';

function App(): JSX.Element {
  type cityNameType = 'Gliwice' | 'Hamburg';
  const [currentCity, setCurrentCity] = useState<cityNameType>('Gliwice');

  const setCurrentCityHandler = (city: cityNameType): void => {
    city === 'Gliwice' ? setCurrentCity('Hamburg') : setCurrentCity('Gliwice');
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['currentWeatherData', currentCity],
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL}current.json?key=${API_KEY}&q=${currentCity}&aqi=no`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
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
        setCurrentCity={setCurrentCityHandler}
      />
    </main>
  );
}

export default App;
