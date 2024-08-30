import { useForecastData } from '@/hooks/useForecastData';
import { CityName } from 'shared-types/apiTypes';

interface ForecastTileProps {
  topInfo: string;
  temperature: number;
  weatherIcon: string;
  weatherText: string;
}

const ForecastTile = ({
  topInfo,
  temperature,
  weatherIcon,
  weatherText,
}: ForecastTileProps) => {
  return (
    <div className='flex w-full flex-col gap-1 rounded-md border border-gray-200 bg-white p-4 text-center shadow-xl'>
      <p className='text-sm font-medium text-sky-950'>{topInfo}</p>
      <img src={weatherIcon} alt={weatherText} className='size-12' />
      <p className='text-lg font-semibold text-sky-950'>{temperature}&#8451;</p>
    </div>
  );
};

const TodayForecastPanel = ({ currentCity }: { currentCity: CityName }) => {
  const { data, error, isError, isLoading } = useForecastData(currentCity, 1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error?.message || 'An unexpected error occurred'}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const hourlyData = data.forecast.forecastday[0].hour || [];

  return (
    <main className='flex flex-row gap-7'>
      {hourlyData.map((hour) => {
        const time = hour.time.split(' ')[1];
        return (
          <ForecastTile
            key={hour.time}
            topInfo={time}
            temperature={hour.temp_c}
            weatherIcon={hour.condition.icon}
            weatherText={hour.condition.text}
          />
        );
      })}
    </main>
  );
};

export default TodayForecastPanel;
