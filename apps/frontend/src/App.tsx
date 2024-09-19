import WeatherOverview from './components/Overview/WeatherOverview/WeatherOverview';
import { useTodayOverviewData } from './hooks/useTodayOverviewData/useTodayOverviewData';
import ForecastPanel from './components/Forecast/ForecastPanel/ForecastPanel';
import { createContext } from 'react';
import TodayHighlight from './components/Highlight/TodayHighlight/TodayHighlight';
import LoadingSpinner from './assets/icons/LoadingSpinner';
import { TodayHighlightSkeleton } from './components/Highlight/TodayHighlightTile/TodayHighlightTileSkeleton';

interface CityContextInterface {
  currentCity: string;
  setCurrentCity: (city: string) => void;
}

export const CurrentCityContext = createContext<CityContextInterface>({
  currentCity: 'Gliwice',
  setCurrentCity: () => {},
});

function App(): JSX.Element {
  const { data, error, isError, isLoading, setCurrentCity, currentCity } =
    useTodayOverviewData('Gliwice');

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
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
    <CurrentCityContext.Provider value={{ currentCity, setCurrentCity }}>
      <main className='max-w-5xl shadow-xl lg:flex lg:justify-center lg:rounded-3xl lg:align-middle xl:w-[1150px] xl:max-w-6xl'>
        <WeatherOverview
          city={name}
          country={country}
          localtime={localtime}
          temperature={temp_c}
          condition={condition}
        />
        <section className='flex flex-col gap-12 bg-gray-200 p-4 lg:w-9/12 lg:rounded-r-3xl lg:p-8 xl:w-3/4'>
          <ForecastPanel />
          {isLoading ? (
            <TodayHighlightSkeleton />
          ) : (
            <TodayHighlight
              heatIndex={heatindex_c}
              uv={uv}
              humidity={humidity}
              precipitation={precip_mm}
              visibility={vis_km}
              windSpeed={wind_kph}
            />
          )}
        </section>
      </main>
    </CurrentCityContext.Provider>
  );
}

export default App;
