import { CurrentCityContext } from '@/App';
import { API_KEY, API_URL } from '@/constants/api';
import { useApiData } from '@/hooks/useApiData/useApiData';
import { useDataFetching } from '@/hooks/useDataFetching/useDataFetching';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { FetchForecastResult } from 'shared-schemas/apiSchemas';
import { ForecastData } from 'shared-types/apiTypes';
import { SwiperSlide } from 'swiper/react';

import SwiperWrapper from '../../UI/SwiperWrapper/SwiperWrapper';
import ForecastTile from '../ForecastTile/ForecastTile';
import ForecastTileSkeleton from '../ForecastTile/ForecastTileSkeleton';

const WeekForecast = () => {
  const { currentCity } = useContext(CurrentCityContext);

  const fetchResult = useApiData<ForecastData>(
    currentCity,
    `${API_URL}forecast.json?days=7&key=${API_KEY}&q=${currentCity}`,
    FetchForecastResult,
    'week',
  );

  const LoadingComponent = () => (
    <div className="flex gap-8 overflow-hidden">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <ForecastTileSkeleton key={i} />
        ))}
    </div>
  );

  return useDataFetching({
    fetchResult,
    loadingComponent: <LoadingComponent />,
    renderData: (data) => {
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
    },
  });
};

export default WeekForecast;
