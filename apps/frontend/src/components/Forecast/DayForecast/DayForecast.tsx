import { useContext } from 'react';
import dayjs from 'dayjs';
import { SwiperSlide } from 'swiper/react';
import SwiperWrapper from '../../UI/SwiperWrapper';

import { useForecastData } from '@/hooks/useForecastData/useForecastData';
import ForecastTile from '../ForecastTile/ForecastTile';
import { CurrentCityContext } from '@/App';

import 'swiper/css';
import ForecastTileSkeleton from '../ForecastTile/ForecastTileSkeleton';

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
  isToday: boolean,
  currentHour: string
) => {
  const filteredHours = hours.filter(({ time }) => {
    const hour = dayjs(time).format('HH:00');
    return isToday ? hour >= currentHour : true;
  });

  return isToday ? filteredHours : filteredHours.slice(0, 7); // Limit to 7 hours for tomorrow
};

const DayForecast = () => {
  const { currentCity } = useContext(CurrentCityContext);
  const { data, error, isError, isLoading } = useForecastData(currentCity, 2);

  if (isLoading) {
    return (
      <div className='flex gap-8 overflow-hidden'>
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <ForecastTileSkeleton key={i} />
          ))}
      </div>
    );
  }

  if (isError)
    return <div>{error?.message || 'An unexpected error occurred'}</div>;

  if (!data) return <div>No data available</div>;

  const { forecastday: forecastDays } = data.forecast;
  const currentHour = dayjs().format('HH:00');

  const filteredForecasts = forecastDays.map((day, index) =>
    filterHours(day.hour, index === 0, currentHour)
  );

  return (
    <SwiperWrapper>
      {filteredForecasts.map((hours) =>
        hours.map(({ time, temp_c, condition }, hourIndex) => {
          const hour = dayjs(time).format('HH:00');
          return (
            <SwiperSlide key={`${time}-${hourIndex}`} data-testid='data-out'>
              <ForecastTile
                topInfo={hour}
                temperature={temp_c}
                weatherIcon={condition.icon}
                weatherText={condition.text}
              />
            </SwiperSlide>
          );
        })
      )}
    </SwiperWrapper>
  );
};

export default DayForecast;
