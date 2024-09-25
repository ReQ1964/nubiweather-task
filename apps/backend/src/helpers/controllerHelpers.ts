import {
  ForecastSchemaType,
  UnFlattenedForecastSchemaType,
} from '@/schema/weatherApi';
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

export const isTimeExpired = (inputTime: string): boolean => {
  const parsedTime = dayjs(inputTime);
  const currentTime = dayjs();

  return currentTime.isAfter(parsedTime.add(15, 'minute'));
};

export const flattenTodayData = <T, R>(parsedData: T): R => {
  const finalObj: any = {};

  const flatten = (obj: any): void => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        flatten(value);
      } else {
        finalObj[key === 'text' ? 'condition' : key] = value;
      }
    }
  };

  flatten(parsedData);
  return finalObj;
};

export const flattenForecastDays = (
  parsedData: UnFlattenedForecastSchemaType,
): ForecastSchemaType => {
  const { name, localtime } = parsedData.location;

  const dayForecasts = parsedData.forecast.forecastday.map((dayForecast) => ({
    date: dayForecast.date,
    avgtemp_c: dayForecast.day.avgtemp_c,
    condition: dayForecast.day.condition.text,
    icon: dayForecast.day.condition.icon,
    hourForecasts: dayForecast.hour.map((hourForecast) => ({
      hour: hourForecast.time.split(' ')[1],
      temp_c: hourForecast.temp_c,
      condition: hourForecast.condition.text,
      icon: hourForecast.condition.icon,
    })),
  }));

  return {
    name,
    localtime,
    dayForecasts,
  };
};
