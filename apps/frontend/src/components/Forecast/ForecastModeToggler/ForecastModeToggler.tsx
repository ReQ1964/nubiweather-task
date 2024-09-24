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
    <div className="mb-6 flex flex-row gap-3">
      {buttons.map(({ mode, label }) => (
        <button
          key={mode}
          className={`relative text-xl font-bold text-white duration-75 hover:scale-105 ${
            forecastMode === mode
              ? "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-white after:content-[''] hover:after:h-[3px] "
              : 'opacity-50'
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
