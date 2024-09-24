import { API_URL } from '@/constants/api';
import dayjs from 'dayjs';
import { http, HttpResponse } from 'msw';
import {
  CurrentWeatherSchemaType,
  ForecastData,
  TodayHighlightSchemaType,
} from 'shared-types/apiTypes';

export const mockForecastData: ForecastData = {
  forecast: {
    forecastday: [
      {
        date: '2024-09-08',
        day: {
          avgtemp_c: 22,
          condition: {
            text: 'Clear',
            icon: 'dayIcon1',
          },
        },
        hour: [
          {
            time: '2024-09-09 14:00',
            temp_c: 20,
            condition: {
              text: 'Clear1',
              icon: 'icon1',
            },
          },
          {
            time: '2024-09-09 15:00',
            temp_c: 30,
            condition: {
              text: 'Clear2',
              icon: 'icon2',
            },
          },
        ],
      },
      {
        date: '2024-09-08',
        day: {
          avgtemp_c: 22,
          condition: {
            text: 'Clear',
            icon: 'dayIcon2',
          },
        },
        hour: [
          {
            time: '2024-09-09 00:00',
            temp_c: 25,
            condition: {
              text: 'Clear3',
              icon: 'icon3',
            },
          },
          {
            time: '2024-09-09 01:00',
            temp_c: 35,
            condition: {
              text: 'Clear4',
              icon: 'icon4',
            },
          },
        ],
      },
    ],
  },
};

export const mockCurrentWeatherData: CurrentWeatherSchemaType = {
  name: 'Gliwice',
  country: 'Poland',
  localtime: dayjs().toString(),
  temp_c: 22.5,
  condition: 'Partly Cloudy',
  icon: 'icon',
};

export const mockTodayHiglightData: TodayHighlightSchemaType = {
  localtime: dayjs().toString(),
  humidity: 60,
  uv: 5.5,
  vis_km: 10,
  wind_kph: 15,
  precip_mm: 0.5,
  heatindex_c: 23.1,
};

export const handlers = [
  http.get(`${API_URL}forecast.json`, () => {
    return HttpResponse.json(mockForecastData);
  }),

  http.get(`http://localhost:5000/currentWeather`, () => {
    return HttpResponse.json(mockCurrentWeatherData);
  }),
  http.get(`http://localhost:5000/todayHighlight`, () => {
    return HttpResponse.json(mockTodayHiglightData);
  }),
];
