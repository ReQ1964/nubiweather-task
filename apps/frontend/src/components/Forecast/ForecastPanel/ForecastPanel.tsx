import { useState } from 'react';

import DayForecast from '../DayForecast/DayForecast';
import ForecastModeToggler from '../ForecastModeToggler/ForecastModeToggler';
import WeekForecast from '../WeekForecast/WeekForecast';

export type ForecastMode = 'today' | 'week';

const ForecastPanel = () => {
  const [forecastMode, setForecastMode] = useState<ForecastMode>('today');
  return (
    <section>
      <div className="mb-8 flex  flex-row justify-between">
        <ForecastModeToggler
          forecastMode={forecastMode}
          setForecastMode={setForecastMode}
        />
        <div className="flex size-10 cursor-pointer items-center  justify-center rounded-full bg-slate-500 text-white duration-75 hover:scale-105 hover:bg-slate-400">
          U
        </div>
      </div>
      {forecastMode === 'today' ? <DayForecast /> : <WeekForecast />}
    </section>
  );
};

export default ForecastPanel;
