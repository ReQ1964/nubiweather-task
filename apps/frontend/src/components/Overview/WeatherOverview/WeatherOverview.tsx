import dayjs from 'dayjs';
import cityImg from '@/assets/img/city-bg.jpg';
import CityAutocompleteInput from '../CityAutocompleteInput/CityAutocompleteInput';
import { ReactNode, useContext } from 'react';
import { CurrentCityContext } from '@/App';
import { CurrentWeatherSchema } from 'shared-schemas/apiSchemas';
import { CurrentWeatherSchemaType } from 'shared-types/apiTypes';
import { useApiData } from '@/hooks/useApiData/useApiData';
import { useDataFetching } from '@/hooks/useDataFetching/useDataFetching';

const WeatherOverview = (): ReactNode => {
  const { currentCity } = useContext(CurrentCityContext);
  const fetchResult = useApiData<CurrentWeatherSchemaType>(
    currentCity,
    'http://localhost:5000/currentWeather',
    CurrentWeatherSchema,
  );

  return useDataFetching({
    fetchResult,
    errorClassName: 'px-4 py-6 lg:w-3/12 lg:rounded-l-3xl lg:p-8',
    loadingClassName:
      'flex items-center justify-center px-4 py-20 lg:w-3/12 lg:rounded-l-3xl lg:p-8',
    renderData: (data) => {
      const { name, country, localtime, temp_c, condition, icon } = data;
      const formattedDate = dayjs(localtime).format('dddd, D MMMM');

      return (
        <section className="flex flex-col px-4 py-6 lg:w-3/12 lg:rounded-l-3xl lg:p-8">
          <header className="flex flex-col gap-4">
            <nav className="relative flex flex-col gap-4">
              <div>
                <h2 className="mr-7 text-3xl">
                  {name}, {country}
                </h2>
                <p>{formattedDate}</p>
              </div>
              <CityAutocompleteInput />
            </nav>
          </header>
          <main className="flex flex-row justify-center pb-6 pt-10 sm:py-12 lg:flex-col lg:py-0 lg:pt-6 lg:text-center">
            <img src={icon} alt={condition} className="w-28 lg:self-center" />
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
