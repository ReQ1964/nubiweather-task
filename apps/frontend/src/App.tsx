import WeatherOverview from './components/WeatherOverview';
import { useTodayForecastData } from './hooks/useTodayForecastData';

function App(): JSX.Element {
  const { data, error, isError, isLoading, toggleCity } =
    useTodayForecastData('Gliwice');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error?.message || 'An unexpected error occurred'}</div>;
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
        toggleCity={toggleCity}
      />
    </main>
  );
}

export default App;
