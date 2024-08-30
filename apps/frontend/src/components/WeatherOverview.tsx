import ExchangeArrowIcon from '@/assets/icons/ExchangeArrowIcon';
import dayjs from 'dayjs';
import type { CityName } from '@/App';

interface WeatherOverviewPropsInterface {
  city: CityName;
  country: string;
  localtime: string;
  temperature: string;
  condition: {
    text: string;
    icon: string;
  };
  setCurrentCity: (city: CityName) => void;
}

const WeatherOverview = ({
  city,
  country,
  localtime,
  temperature,
  condition,
  setCurrentCity,
}: WeatherOverviewPropsInterface): JSX.Element => {
  const date = dayjs(localtime.split(' ')[0]);
  const dayName = date.format('dddd');
  const monthName = date.format('MMMM');
  const dayOfTheMonth = date.get('date');

  return (
    <section className='p-3'>
      <header>
        <nav className='relative'>
          <h2 className='text-3xl'>
            {city}, {country}
          </h2>
          <button
            className='absolute right-1 top-1'
            onClick={() =>
              setCurrentCity(city === 'Gliwice' ? 'Hamburg' : 'Gliwice')
            }
            aria-label='Switch City'
          >
            <ExchangeArrowIcon />
          </button>
        </nav>
        <p>
          {dayName}, {dayOfTheMonth} {monthName}
        </p>
      </header>
      <main className='flex flex-row justify-start align-middle'>
        <div>
          <img src={condition.icon} alt={condition.text} className='size-36' />
        </div>
        <div className='flex flex-col justify-center gap-2 align-middle'>
          <h1 className='text-5xl'>{temperature}&#8451;</h1>
          <div className='flex flex-row'>
            <img
              src={condition.icon}
              alt={condition.text}
              className='size-10 '
            />
            <p className='self-center'>{condition.text}</p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default WeatherOverview;
