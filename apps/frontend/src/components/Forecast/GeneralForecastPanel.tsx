import { useState } from 'react';
import ForecastModeToggler from './ForecastModeToggler';
import TodayForecastPanel from './TodayForecastPanel';
import { CityName } from 'shared-types/apiTypes';

export type ForecastMode = 'today' | 'week';

const GeneralForecastPanel = ({ currentCity }: { currentCity: CityName }) => {
  const [forecastMode, setForecastMode] = useState<ForecastMode>('today');

  return (
    <section className='p-4'>
      <ForecastModeToggler
        forecastMode={forecastMode}
        setForecastMode={setForecastMode}
      />
      {forecastMode === 'today' ? (
        <TodayForecastPanel currentCity={currentCity} />
      ) : (
        <div>TBA</div>
      )}
    </section>
  );
};

export default GeneralForecastPanel;
