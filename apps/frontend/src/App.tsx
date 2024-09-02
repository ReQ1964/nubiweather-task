import WeatherOverview from './components/WeatherOverview';
import { useTodayOverviewData } from './hooks/useTodayOverviewData';
import ForecastPanel from './components/Forecast/ForecastPanel';
import { createContext } from 'react';
import { CityName } from 'shared-types/apiTypes';

export const CurrentCityContext = createContext<CityName>('Gliwice');

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
    <CurrentCityContext.Provider value={currentCity}>
      <main>
        <WeatherOverview
          city={data.location.name}
          country={data.location.country}
          localtime={data.location.localtime}
          temperature={data.current.temp_c}
          condition={data.current.condition}
          toggleCity={toggleCity}
        />
        <section className='bg-gradient-to-br from-sky-100 to-sky-900'>
          <ForecastPanel />
        </section>
      </main>
    </CurrentCityContext.Provider>
  );
}

export default App;
