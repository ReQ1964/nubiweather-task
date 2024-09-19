import { ForecastMode } from '../ForecastPanel/ForecastPanel';

interface ForecastModeTogglerProps {
  forecastMode: ForecastMode;
  setForecastMode: (mode: ForecastMode) => void;
}

const ForecastModeToggler = ({
  forecastMode,
  setForecastMode,
}: ForecastModeTogglerProps) => {
  const buttons = [
    { mode: 'today', label: 'Today' },
    { mode: 'week', label: 'Week' },
  ];

  return (
    <div className='mb-6 flex flex-row gap-3'>
      {buttons.map(({ mode, label }) => (
        <button
          key={mode}
          className={`relative text-lg font-bold ${
            forecastMode === mode
              ? "text-black after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-black after:content-['']"
              : 'text-gray-500'
          }`}
          onClick={() => setForecastMode(mode as ForecastMode)}
          aria-pressed={forecastMode === mode}
          aria-label={`${label} forecast mode`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ForecastModeToggler;
