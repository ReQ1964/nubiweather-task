import { useContext } from 'react';
import dayjs from 'dayjs';
import { CurrentCityContext } from '@/App';
import { useForecastData } from '@/hooks/useForecastData';
import ForecastTile from './ForecastTile';

const WeekForecast = () => {
  const currentCity = useContext(CurrentCityContext);
  const { data, error, isError, isLoading } = useForecastData(currentCity, 7);

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <div>{error?.message || 'An unexpected error occurred'}</div>;

  if (!data) return <div>No data available</div>;

  const days = data.forecast.forecastday.length;
  const dataWithoutCurrentDay =
    days > 1 ? data.forecast.forecastday.slice(1) : [];

  return (
    <main className='flex flex-row justify-center gap-7'>
      {dataWithoutCurrentDay.map((item) => {
        const weekday = dayjs(item.date).format('ddd');

        return (
          <ForecastTile
            key={item.date}
            topInfo={weekday}
            temperature={item.day.avgtemp_c}
            weatherIcon={item.day.condition.icon}
            weatherText={item.day.condition.text}
          />
        );
      })}
    </main>
  );
};

export default WeekForecast;
