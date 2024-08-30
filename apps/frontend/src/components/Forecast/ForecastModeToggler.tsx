import { ForecastMode } from './GeneralForecastPanel';

interface ForecastModeTogglerProps {
  forecastMode: ForecastMode;
  setForecastMode: (mode: ForecastMode) => void;
}

const ForecastModeToggler = ({
  forecastMode,
  setForecastMode,
}: ForecastModeTogglerProps) => {
  const setForecastToToday = () => {
    setForecastMode('today');
  };
  const setForecastToWeek = () => {
    setForecastMode('week');
  };

  return (
    <div className='mb-8 flex flex-row gap-3'>
      <button
        className={`relative font-bold ${
          forecastMode === 'today'
            ? "text-black after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-black after:content-['']"
            : 'text-gray-400'
        }`}
        onClick={setForecastToToday}
      >
        Today
      </button>
      <button
        className={`relative font-bold ${
          forecastMode === 'week'
            ? "text-black after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-black after:content-['']"
            : 'text-gray-400'
        }`}
        onClick={setForecastToWeek}
      >
        Week
      </button>
    </div>
  );
};

export default ForecastModeToggler;
