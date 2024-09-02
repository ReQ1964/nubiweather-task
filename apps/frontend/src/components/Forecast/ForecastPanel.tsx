import { useState } from 'react';
import ForecastModeToggler from './ForecastModeToggler';
import DayForecast from './DayForecast';
import WeekForecast from './WeekForecast';

export type ForecastMode = 'today' | 'week';

const ForecastPanel = () => {
  const [forecastMode, setForecastMode] = useState<ForecastMode>('today');
  return (
    <section className='p-4'>
      <ForecastModeToggler
        forecastMode={forecastMode}
        setForecastMode={setForecastMode}
      />
      {forecastMode === 'today' ? (
        <DayForecast days={1} />
      ) : (
        <WeekForecast days={7} />
      )}
    </section>
  );
};

export default ForecastPanel;
