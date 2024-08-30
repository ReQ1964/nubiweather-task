import WeatherOverview from './components/WeatherOverview';
import { useTodayOverviewData } from './hooks/useTodayOverviewData';
import GeneralForecastPanel from './components/Forecast/GeneralForecastPanel';

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
      <section className='bg-gradient-to-br from-sky-300 to-sky-700'>
        <GeneralForecastPanel currentCity={currentCity} />
      </section>
    </main>
  );
}

export default App;
