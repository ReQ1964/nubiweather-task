import { useState } from 'react';
import ForecastModeToggler from './ForecastModeToggler';
import DayForecast from './DayForecast';
// import WeekForecast from './WeekForecast';
import WeekForecastNo from './WeekForecast';

export type ForecastMode = 'today' | 'week';

const ForecastPanel = () => {
  const [forecastMode, setForecastMode] = useState<ForecastMode>('today');
  return (
    <section>
      <ForecastModeToggler
        forecastMode={forecastMode}
        setForecastMode={setForecastMode}
      />
      {forecastMode === 'today' ? <DayForecast /> : <WeekForecastNo />}
    </section>
  );
};

export default ForecastPanel;
