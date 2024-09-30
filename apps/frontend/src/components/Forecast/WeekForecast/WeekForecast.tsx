import { CurrentCityContext } from '@/App';
import { API_URL } from '@/constants/api';
import { useApiData } from '@/hooks/useApiData/useApiData';
import { useDataFetching } from '@/hooks/useDataFetching/useDataFetching';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { WeekForecastSchema } from 'shared-schemas/apiSchemas';
import { WeekForecastSchemaType } from 'shared-types/apiTypes';
import { SwiperSlide } from 'swiper/react';

import SwiperWrapper from '../../UI/SwiperWrapper/SwiperWrapper';
import ForecastTile from '../ForecastTile/ForecastTile';
import ForecastTileSkeleton from '../ForecastTile/ForecastTileSkeleton';

const WeekForecast = () => {
  const { currentCity } = useContext(CurrentCityContext);

  const fetchResult = useApiData<WeekForecastSchemaType>(
    currentCity,
    `${API_URL}forecast/week`,
    WeekForecastSchema,
    'week',
  );

  const LoadingComponent = () => (
    <div className="flex justify-start gap-8 overflow-hidden">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <ForecastTileSkeleton key={i} />
        ))}
    </div>
  );

  return useDataFetching({
    fetchResult,
    loadingComponent: <LoadingComponent />,
    errorClassName: 'mb-6 h-full min-h-[120px]',
    renderData: (data) => {
      const { dayForecasts } = data;
      const dataWithoutCurrentDay =
        dayForecasts.length > 1 ? dayForecasts.slice(1) : [];
      return (
        <SwiperWrapper>
          {dataWithoutCurrentDay.map((item, index) => {
            const weekday = dayjs(item.date).format('ddd');

            return (
              <SwiperSlide key={item.date}>
                <ForecastTile
                  topInfo={weekday}
                  temperature={item.avgtemp_c}
                  weatherIcon={item.icon}
                  weatherText={item.condition}
                  first={index === 0}
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
