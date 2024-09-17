import dayjs from 'dayjs';
import cityImg from '@/assets/img/city-bg.jpg';
import CityAutocompleteInput from '../CityAutocompleteInput/CityAutocompleteInput';

interface WeatherOverviewProps {
  city: string;
  country: string;
  localtime: string;
  temperature: number;
  condition: {
    text: string;
    icon: string;
  };
}

const WeatherOverview = ({
  city,
  country,
  localtime,
  temperature,
  condition: { text, icon },
}: WeatherOverviewProps): JSX.Element => {
  const date = dayjs(localtime);
  const formattedDate = date.format('dddd, D MMMM');

  return (
    <section className='flex flex-col px-4 py-6 lg:w-3/12 lg:rounded-l-3xl lg:p-8'>
      <header className='flex flex-col gap-4'>
        <nav className='relative flex flex-col gap-4'>
          <div>
            <h2 className='mr-7 text-3xl'>
              {city}, {country}
            </h2>
            <p>{formattedDate}</p>
          </div>
          <CityAutocompleteInput />
        </nav>
      </header>
      <main className='flex flex-row justify-center pb-6 pt-10 sm:py-12 lg:flex-col lg:py-0 lg:pt-6 lg:text-center'>
        <img src={icon} alt={text} className='w-28 lg:self-center' />
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-5xl'>{temperature}&#8451;</h1>
          <p>{text}</p>
        </div>
      </main>
      <img
        src={cityImg}
        alt='City view'
        className='mt-auto hidden rounded-2xl brightness-90 lg:block'
      />
    </section>
  );
};

export default WeatherOverview;
