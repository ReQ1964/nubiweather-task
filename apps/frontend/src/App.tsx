import TodayForecastPanel from './components/Forecast/TodayForecastPanel';
import WeatherOverview from './components/WeatherOverview';
import { useTodayOverviewData } from './hooks/useTodayOverviewData';

function App(): JSX.Element {
  const { data, error, isError, isLoading, toggleCity, currentCity } =
    useTodayOverviewData('Gliwice');

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
      <TodayForecastPanel currentCity={currentCity} />
    </main>
  );
}

export default App;
