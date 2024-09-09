import { useState } from 'react';
import ForecastModeToggler from './ForecastModeToggler/ForecastModeToggler';
import DayForecast from './DayForecast/DayForecast';
import WeekForecast from './WeekForecast';

export type ForecastMode = 'today' | 'week';

const ForecastPanel = () => {
  const [forecastMode, setForecastMode] = useState<ForecastMode>('today');
  return (
    <section>
      <ForecastModeToggler
        forecastMode={forecastMode}
        setForecastMode={setForecastMode}
      />
      {forecastMode === 'today' ? <DayForecast /> : <WeekForecast />}
    </section>
  );
};

export default ForecastPanel;
