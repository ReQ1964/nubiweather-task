import WeatherOverview from './components/WeatherOverview';
import { useTodayOverviewData } from './hooks/useTodayOverviewData';
import ForecastPanel from './components/Forecast/ForecastPanel';
import { createContext } from 'react';
import { CityName } from 'shared-types/apiTypes';
import DetailedOverview from './components/DetailedOverview/DetailedOverview';

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

  const { name, country, localtime } = data.location;
  const {
    temp_c,
    condition,
    heatindex_c,
    uv,
    humidity,
    precip_mm,
    vis_km,
    wind_kph,
  } = data.current;

  return (
    <CurrentCityContext.Provider value={currentCity}>
      <main>
        <WeatherOverview
          city={name}
          country={country}
          localtime={localtime}
          temperature={temp_c}
          condition={condition}
          toggleCity={toggleCity}
        />
        <section className='flex flex-col gap-5 bg-gradient-to-br from-sky-100 to-sky-900'>
          <ForecastPanel />
          <DetailedOverview
            uv={uv}
            humidity={humidity}
            heatindex_c={heatindex_c}
            precip_mm={precip_mm}
            vis_km={vis_km}
            wind_kph={wind_kph}
          />
        </section>
      </main>
    </CurrentCityContext.Provider>
  );
}

export default App;
