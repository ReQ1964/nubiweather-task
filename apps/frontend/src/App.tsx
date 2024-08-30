import { useQuery } from '@tanstack/react-query';
import WeatherOverview from './components/WeatherOverview';
import axios from 'axios';

function App(): JSX.Element {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['currentWeatherData'],
    queryFn: async () => {
      const res = await axios.get(
        'http://api.weatherapi.com/v1/current.json?key=8a1b2c3306344ad2bac71007243008&q=Gliwice&aqi=no'
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
      />
    </main>
  );
}

export default App;
