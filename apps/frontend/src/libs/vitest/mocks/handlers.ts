import { http, HttpResponse } from 'msw';
import { API_URL } from '@/constants/api';
import { ForecastData, WeatherData } from 'shared-types/apiTypes';

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

export const mockOverviewData: WeatherData = {
  location: {
    name: 'Gliwice',
    country: 'Poland',
    localtime: '2024-09-14 10:00',
  },
  current: {
    temp_c: 22.5,
    condition: {
      text: 'Partly Cloudy',
      icon: 'icon',
    },
    humidity: 60,
    uv: 5.5,
    vis_km: 10,
    wind_kph: 15,
    precip_mm: 0.5,
    heatindex_c: 23.1,
  },
};

export const handlers = [
  http.get(`${API_URL}forecast.json`, () => {
    return HttpResponse.json(mockForecastData);
  }),
  http.get(`${API_URL}current.json`, () => {
    return HttpResponse.json(mockOverviewData);
  }),
];
