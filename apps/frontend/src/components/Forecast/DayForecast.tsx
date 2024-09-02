import { useForecastData } from '@/hooks/useForecastData';
import ForecastTile from './ForecastTile';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { CurrentCityContext } from '@/App';
import { Fragment } from 'react';

type ForecastHour = {
  condition: {
    text: string;
    icon: string;
  };
  time: string;
  temp_c: number;
};

const filterHours = (
  hours: ForecastHour[],
  dayIndex: number,
  currentHour: string
) => {
  return hours
    .filter(({ time }) => {
      const hour = dayjs(time).format('HH:00');
      return dayIndex === 0 ? hour >= currentHour : true;
      // return today's forecast only ahead of current time, not for the whole day
    })
    .slice(0, dayIndex === 1 ? 7 : undefined);
  // return tommorow's forecast only for first 7 hours
};

const renderForecastTiles = (hours: ForecastHour[]) => {
  return hours.map(({ time, temp_c, condition }) => {
    const hour = dayjs(time).format('HH:00');
    return (
      <ForecastTile
        key={time}
        topInfo={hour}
        temperature={temp_c}
        weatherIcon={condition.icon}
        weatherText={condition.text}
      />
    );
  });
};

const DayForecast = () => {
  const currentCity = useContext(CurrentCityContext);
  const { data, error, isError, isLoading } = useForecastData(currentCity, 2);

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <div>{error?.message || 'An unexpected error occurred'}</div>;

  if (!data) return <div>No data available</div>;

  const { forecastday: forecastDays } = data.forecast;
  const currentHour = dayjs().format('HH:00');

  return (
    <main className='flex flex-row gap-7'>
      {forecastDays.map((day, index) => {
        const hours = filterHours(day.hour, index, currentHour);
        return <Fragment key={day.date}>{renderForecastTiles(hours)}</Fragment>;
      })}
    </main>
  );
};

export default DayForecast;
