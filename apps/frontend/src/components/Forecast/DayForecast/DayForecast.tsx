import dayjs from 'dayjs';
import { useContext } from 'react';

import 'swiper/css';

import { API_URL } from '@/constants/api';
import { useApiData } from '@/hooks/useApiData/useApiData';
import { useDataFetching } from '@/hooks/useDataFetching/useDataFetching';
import { CurrentCityContext } from '@/layouts/BaseLayout';
import { ForecastSchema } from 'shared-schemas/apiSchemas';
import { ForecastSchemaType } from 'shared-types/apiTypes';
import { SwiperSlide } from 'swiper/react';

import SwiperWrapper from '../../UI/SwiperWrapper/SwiperWrapper';
import ForecastTile from '../ForecastTile/ForecastTile';
import ForecastTileSkeleton from '../ForecastTile/ForecastTileSkeleton';

type ForecastHour = {
  hour: string;
  condition: string;
  icon: string;
  temp_c: number;
};

const filterHours = (
  hours: ForecastHour[],
  isToday: boolean,
  currentHour: string,
): ForecastHour[] => {
  return hours
    .filter(({ hour }) => (isToday ? hour >= currentHour : true))
    .slice(0, isToday ? undefined : 7); // Limit to 7 hours for tomorrow
};

const DayForecast = () => {
  const { currentCity } = useContext(CurrentCityContext);

  const fetchResult = useApiData<ForecastSchemaType>(
    currentCity,
    `${API_URL}forecast/oneDay`,
    ForecastSchema,
    'day',
  );

  const LoadingComponent = () => (
    <div className="flex gap-8 overflow-hidden">
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
    renderData: ({ dayForecasts, localtime }) => {
      const currentHour = dayjs(localtime).format('HH:00');
      const filteredForecasts = dayForecasts.flatMap((day, index) =>
        filterHours(day.hourForecasts, index === 0, currentHour),
      );

      return (
        <SwiperWrapper>
          {filteredForecasts.map(({ hour, temp_c, condition, icon }, index) => {
            return (
              <SwiperSlide key={`${hour}-${index}`} data-testid="data-out">
                <ForecastTile
                  topInfo={hour}
                  temperature={temp_c}
                  weatherIcon={icon}
                  weatherText={condition}
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

export default DayForecast;
