import ExchangeArrowIcon from '@/assets/icons/ExchangeArrowIcon';
import dayjs from 'dayjs';
import { CityName } from 'shared-types/apiTypes';

interface WeatherOverviewPropsInterface {
  city: CityName;
  country: string;
  localtime: string;
  temperature: number;
  condition: {
    text: string;
    icon: string;
  };
  toggleCity: (city: CityName) => void;
}

const WeatherOverview = ({
  city,
  country,
  localtime,
  temperature,
  condition,
  toggleCity,
}: WeatherOverviewPropsInterface): JSX.Element => {
  const date = dayjs(localtime.split(' ')[0]);
  const dayName = date.format('dddd');
  const monthName = date.format('MMMM');
  const dayOfTheMonth = date.get('date');

  return (
    <section className='px-4 py-6'>
      <header>
        <nav className='relative'>
          <h2 className='text-3xl'>
            {city}, {country}
          </h2>
          <button
            className='absolute right-1 top-1'
            onClick={() => toggleCity(city)}
            aria-label='Switch City'
          >
            <ExchangeArrowIcon />
          </button>
        </nav>
        <p>
          {dayName}, {dayOfTheMonth} {monthName}
        </p>
      </header>
      <main className='mr-9 flex flex-row justify-center pt-6 align-middle'>
        <div>
          <img src={condition.icon} alt={condition.text} className='size-28' />
        </div>
        <div className='flex flex-col justify-center gap-2 align-middle'>
          <h1 className='text-5xl'>{temperature}&#8451;</h1>
          <p>{condition.text}</p>
        </div>
      </main>
    </section>
  );
};

export default WeatherOverview;
