import { useContext } from 'react';
import dayjs from 'dayjs';
import { CurrentCityContext } from '@/App';
import { useForecastData } from '@/hooks/useForecastData';
import ForecastTile from './ForecastTile';
import { Swiper, SwiperSlide } from 'swiper/react';

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
    <Swiper
      className='flex flex-row gap-7'
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
      {dataWithoutCurrentDay.map((item) => {
        const weekday = dayjs(item.date).format('ddd');

        return (
          <SwiperSlide key={item.date}>
            <ForecastTile
              topInfo={weekday}
              temperature={item.day.avgtemp_c}
              weatherIcon={item.day.condition.icon}
              weatherText={item.day.condition.text}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default WeekForecast;
