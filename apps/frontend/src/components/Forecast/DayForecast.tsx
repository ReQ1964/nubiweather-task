import { useForecastData } from '@/hooks/useForecastData';
import ForecastTile from './ForecastTile';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { CurrentCityContext } from '@/App';

const DayForecast = ({ days }: { days: number }) => {
  const currentCity = useContext(CurrentCityContext);
  const { data, error, isError, isLoading } = useForecastData(
    currentCity,
    days
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error?.message || 'An unexpected error occurred'}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  // add a few hour forecasts on the next day, optimize the component cuz its heavy days>2 i suppose!

  return (
    <main className='flex flex-row gap-7'>
      {data.forecast.forecastday[0].hour.map((item) => {
        const currentHour = dayjs().format('HH:00');
        const time = item.time.split(' ')[1];
        if (time >= currentHour)
          return (
            <ForecastTile
              key={item.time}
              topInfo={time}
              temperature={item.temp_c}
              weatherIcon={item.condition.icon}
              weatherText={item.condition.text}
            />
          );
      })}
    </main>
  );
};

export default DayForecast;
