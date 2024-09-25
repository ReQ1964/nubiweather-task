import { CurrentCityContext } from '@/App';
import cityImg from '@/assets/img/city-bg.jpg';
import { useApiData } from '@/hooks/useApiData/useApiData';
import { useDataFetching } from '@/hooks/useDataFetching/useDataFetching';
import dayjs from 'dayjs';
import { ReactNode, useContext } from 'react';
import { CurrentWeatherSchema } from 'shared-schemas/apiSchemas';
import { CurrentWeatherSchemaType } from 'shared-types/apiTypes';

import CityAutocompleteInput from '../CityAutocompleteInput/CityAutocompleteInput';

const WeatherOverview = (): ReactNode => {
  const { currentCity } = useContext(CurrentCityContext);
  const fetchResult = useApiData<CurrentWeatherSchemaType>(
    currentCity,
    'http://localhost:5000/currentWeather',
    CurrentWeatherSchema,
    'overview',
  );

  return useDataFetching({
    fetchResult,
    errorClassName: 'px-4 py-6 lg:w-3/12 lg:rounded-l-3xl lg:p-8',
    loadingClassName:
      'flex items-center justify-center px-4 py-20 lg:w-3/12 lg:rounded-l-3xl lg:p-8',
    renderData: (data) => {
      const { name, country, localtime, temp_c, condition, icon } = data;
      const formattedDate = dayjs(localtime).format('dddd, D MMMM');
      const formattedTime = dayjs().format('HH:mm');

      return (
        <section
          className="flex flex-col justify-center gap-10 px-4 py-6 sm:flex-row sm:p-14 md:p-20 lg:w-3/12 lg:flex-col lg:rounded-l-3xl lg:border-l-8 lg:border-cyan-950 lg:p-6 lg:shadow-2xl
         "
        >
          <header className="mx-auto flex flex-col gap-4 lg:w-full">
            <nav className="relative flex flex-col gap-4">
              <div className="relative">
                <h2 className="mb-2 mr-7 text-3xl">
                  <span className="sm:text-4xl">{name}</span>, {country}
                </h2>
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
              </div>
              <CityAutocompleteInput />
            </nav>
          </header>
          <main className="mx-auto flex max-w-96 flex-row justify-center p-8 lg:flex-col lg:p-6 lg:text-center">
            <img
              src={icon}
              alt={condition}
              className="min-w-24 lg:self-center"
            />
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-5xl">{temp_c}&#8451;</h1>
              <p>{condition}</p>
            </div>
          </main>
          <img
            src={cityImg}
            alt="City view"
            className="mt-auto hidden rounded-2xl brightness-90 lg:block"
          />
        </section>
      );
    },
  });
};

export default WeatherOverview;
