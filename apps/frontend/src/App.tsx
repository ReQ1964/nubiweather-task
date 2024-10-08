import { createContext, useState } from 'react';

import ForecastPanel from './components/Forecast/ForecastPanel/ForecastPanel';
import TodayHighlight from './components/Highlight/TodayHighlight/TodayHighlight';
import WeatherOverview from './components/Overview/WeatherOverview/WeatherOverview';

interface CityContextInterface {
  currentCity: string;
  setCurrentCity: (city: string) => void;
}

export const CurrentCityContext = createContext<CityContextInterface>({
  currentCity: 'Gliwice',
  setCurrentCity: () => {},
});

function App(): JSX.Element {
  const [currentCity, setCurrentCity] = useState<string>('Gliwice');

  return (
    <CurrentCityContext.Provider value={{ currentCity, setCurrentCity }}>
      <main className="max-w-5xl shadow-xl lg:flex lg:justify-center lg:rounded-3xl lg:align-middle xl:w-[1150px] xl:max-w-6xl">
        <WeatherOverview />
        <section className="flex flex-col gap-12 bg-gradient-to-br from-cyan-950 to-cyan-900 p-4 lg:w-9/12 lg:rounded-r-3xl lg:p-8 xl:w-3/4">
          <ForecastPanel />
          <TodayHighlight />
        </section>
      </main>
    </CurrentCityContext.Provider>
  );
}

export default App;
