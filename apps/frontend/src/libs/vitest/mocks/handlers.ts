import { API_URL } from '@/constants/api';
import dayjs from 'dayjs';
import { http, HttpResponse } from 'msw';
import {
  CurrentWeatherSchemaType,
  ForecastSchemaType,
  TodayHighlightSchemaType,
  WeekForecastSchemaType,
} from 'shared-types/apiTypes';

export const mockForecastData: ForecastSchemaType = {
  name: 'City Name',
  localtime: '2024-09-08 14:00',
  timestamp: '2024-09-08 14:00',
  dayForecasts: [
    {
      date: '2024-09-08',
      avgtemp_c: 22,
      condition: 'Clear',
      icon: 'dayIcon1',
      hourForecasts: [
        {
          hour: '14:00',
          temp_c: 20,
          condition: 'Clear1',
          icon: 'icon1',
        },
        {
          hour: '15:00',
          temp_c: 30,
          condition: 'Clear2',
          icon: 'icon2',
        },
      ],
    },
    {
      date: '2024-09-08',
      avgtemp_c: 22,
      condition: 'Clear',
      icon: 'dayIcon2',
      hourForecasts: [
        {
          hour: '00:00',
          temp_c: 25,
          condition: 'Clear3',
          icon: 'icon3',
        },
        {
          hour: '01:00',
          temp_c: 35,
          condition: 'Clear4',
          icon: 'icon4',
        },
      ],
    },
  ],
};

export const mockWeekForecastData: WeekForecastSchemaType = {
  name: 'City Name',
  localtime: '2024-09-08 14:00',
  timestamp: '2024-09-08 14:00',
  dayForecasts: [
    {
      date: '2024-09-08',
      avgtemp_c: 22,
      condition: 'Clear',
      icon: 'dayIcon1',
    },
    {
      date: '2024-09-09',
      avgtemp_c: 24,
      condition: 'Partly Cloudy',
      icon: 'dayIcon2',
    },
    {
      date: '2024-09-10',
      avgtemp_c: 21,
      condition: 'Rainy',
      icon: 'dayIcon3',
    },
    {
      date: '2024-09-11',
      avgtemp_c: 19,
      condition: 'Stormy',
      icon: 'dayIcon4',
    },
  ],
};

export const mockCurrentWeatherData: CurrentWeatherSchemaType = {
  name: 'Gliwice',
  timestamp: '2024-09-08 14:00',
  country: 'Poland',
  localtime: dayjs().toISOString(),
  temp_c: 22.5,
  condition: 'Partly Cloudy',
  icon: 'icon',
};

export const mockTodayHiglightData: TodayHighlightSchemaType = {
  name: 'Gliwice',
  timestamp: '2024-09-08 14:00',
  humidity: 60,
  uv: 5.5,
  vis_km: 10,
  wind_kph: 15,
  precip_mm: 0.5,
  heatindex_c: 23.1,
};

export const handlers = [
  http.get(`${API_URL}currentWeather`, () => {
    return HttpResponse.json(mockCurrentWeatherData);
  }),

  http.get(`${API_URL}forecast/oneDay`, () => {
    return HttpResponse.json(mockForecastData);
  }),

  http.get(`${API_URL}forecast/week`, () => {
    return HttpResponse.json(mockWeekForecastData);
  }),

  http.get(`${API_URL}todayHighlight`, () => {
    return HttpResponse.json(mockTodayHiglightData);
  }),
];
