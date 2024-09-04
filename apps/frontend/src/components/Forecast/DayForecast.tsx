import { useContext } from 'react';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useForecastData } from '@/hooks/useForecastData';
import ForecastTile from './ForecastTile';
import { CurrentCityContext } from '@/App';

import 'swiper/css';

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
  // return tomorrow's forecast only for the first 7 hours
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
    <div className='flex flex-row gap-7'>
      <Swiper
        spaceBetween={50}
        slidesPerView={2}
        breakpoints={{
          375: {
            slidesPerView: 2,
          },
          450: {
            slidesPerView: 3,
          },
          550: {
            slidesPerView: 4,
          },
          700: {
            slidesPerView: 5,
          },
          900: {
            slidesPerView: 6,
          },
        }}
      >
        {forecastDays.map((day, index) => {
          const hours = filterHours(day.hour, index, currentHour);

          return hours.map(({ time, temp_c, condition }) => {
            const hour = dayjs(time).format('HH:00');
            return (
              <SwiperSlide key={time}>
                <ForecastTile
                  topInfo={hour}
                  temperature={temp_c}
                  weatherIcon={condition.icon}
                  weatherText={condition.text}
                />
              </SwiperSlide>
            );
          });
        })}
      </Swiper>
    </div>
  );
};

export default DayForecast;
