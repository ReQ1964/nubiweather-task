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
        className={`relative text-lg font-bold ${
          forecastMode === 'today'
            ? "text-sky-950 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-sky-950 after:content-['']"
            : 'text-white'
        }`}
        onClick={setForecastToToday}
      >
        Today
      </button>
      <button
        className={`relative text-lg font-bold ${
          forecastMode === 'week'
            ? "text-sky-950 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-sky-950 after:content-['']"
            : 'text-white'
        }`}
        onClick={setForecastToWeek}
      >
        Week
      </button>
    </div>
  );
};

export default ForecastModeToggler;
