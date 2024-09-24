import dayjs from 'dayjs';
import { useContext } from 'react';

import 'swiper/css';

import { CurrentCityContext } from '@/App';
import { API_KEY, API_URL } from '@/constants/api';
import { useApiData } from '@/hooks/useApiData/useApiData';
import { useDataFetching } from '@/hooks/useDataFetching/useDataFetching';
import { FetchForecastResult } from 'shared-schemas/apiSchemas';
import { ForecastData } from 'shared-types/apiTypes';
import { SwiperSlide } from 'swiper/react';

import SwiperWrapper from '../../UI/SwiperWrapper/SwiperWrapper';
import ForecastTile from '../ForecastTile/ForecastTile';
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
  currentHour: string,
) => {
  const filteredHours = hours.filter(({ time }) => {
    const hour = dayjs(time).format('HH:00');
    return isToday ? hour >= currentHour : true;
  });

  return isToday ? filteredHours : filteredHours.slice(0, 7); // Limit to 7 hours for tomorrow
};

const DayForecast = () => {
  const { currentCity } = useContext(CurrentCityContext);

  const fetchResult = useApiData<ForecastData>(
    currentCity,
    `${API_URL}forecast.json?days=2&key=${API_KEY}&q=${currentCity}`,
    FetchForecastResult,
    'day',
  );

  const LoadingComponent = () => (
    <div className="flex gap-8 overflow-hidden">
      {Array(5)
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
      const { forecastday: forecastDays } = data.forecast;
      const currentHour = dayjs().format('HH:00');

      const filteredForecasts = forecastDays.map((day, index) =>
        filterHours(day.hour, index === 0, currentHour),
      );

      return (
        <SwiperWrapper>
          {filteredForecasts
            .flat()
            .map(({ time, temp_c, condition }, index) => {
              const hour = dayjs(time).format('hh:mm A');

              return (
                <SwiperSlide key={`${time}-${index}`} data-testid="data-out">
                  <ForecastTile
                    topInfo={hour}
                    temperature={temp_c}
                    weatherIcon={condition.icon}
                    weatherText={condition.text}
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
