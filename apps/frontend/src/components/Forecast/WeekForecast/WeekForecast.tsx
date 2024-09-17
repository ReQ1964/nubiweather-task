import { useContext } from 'react';
import dayjs from 'dayjs';
import { CurrentCityContext } from '@/App';
import { useForecastData } from '@/hooks/useForecastData/useForecastData';
import ForecastTile from '../ForecastTile/ForecastTile';
import { SwiperSlide } from 'swiper/react';
import SwiperWrapper from '../../UI/SwiperWrapper';
import ForecastTileSkeleton from '../ForecastTile/ForecastTileSkeleton';

const WeekForecast = () => {
  const { currentCity } = useContext(CurrentCityContext);
  const { data, error, isError, isLoading } = useForecastData(currentCity, 7);

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

  const forecastDays = data.forecast.forecastday;
  const dataWithoutCurrentDay =
    forecastDays.length > 1 ? forecastDays.slice(1) : [];
  return (
    <SwiperWrapper>
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
    </SwiperWrapper>
  );
};

export default WeekForecast;
