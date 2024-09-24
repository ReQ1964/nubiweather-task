import dayjs from 'dayjs';
import cityImg from '@/assets/img/city-bg.jpg';
import CityAutocompleteInput from '../CityAutocompleteInput/CityAutocompleteInput';
import { useContext } from 'react';
import { CurrentCityContext } from '@/App';
import LoadingSpinner from '@/assets/icons/LoadingSpinner';
import { CurrentWeatherSchema } from 'shared-schemas/apiSchemas';
import { CurrentWeatherSchemaType } from 'shared-types/apiTypes';
import { useApiData } from '@/hooks/useApiData/useApiData';

const WeatherOverview = (): JSX.Element => {
  const { currentCity } = useContext(CurrentCityContext);
  const { data, error, isLoading, isError } =
    useApiData<CurrentWeatherSchemaType>(
      currentCity,
      'http://localhost:5000/currentWeather',
      CurrentWeatherSchema,
    );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>{error?.message || 'An unexpected error occurred'}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const {
    name,
    country,
    localtime,
    temp_c,
    condition,
    icon,
  }: CurrentWeatherSchemaType = data;
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
};

export default WeatherOverview;
