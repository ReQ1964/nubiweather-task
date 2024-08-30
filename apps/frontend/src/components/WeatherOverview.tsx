import ExchangeArrowIcon from '@/assets/icons/ExchangeArrowIcon';
import dayjs from 'dayjs';

interface WeatherOverviewPropsInterface {
  city: 'Gliwice' | 'Hamburg';
  country: string;
  localtime: string;
  temperature: string;
  condition: {
    text: string;
    icon: string;
  };
  setCurrentCity: (city: 'Gliwice' | 'Hamburg') => void;
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
        <nav className='flex flex-row gap-4'>
          <h2 className='text-3xl'>
            {city}, {country}
          </h2>
          <button
            className='duration-75 hover:scale-105'
            onClick={() => setCurrentCity(city)}
          >
            <ExchangeArrowIcon />
          </button>
        </nav>
        <p>
          {dayName}, {dayOfTheMonth} {monthName}
        </p>
      </header>
      <main className='flex flex-row align-middle'>
        <div>
          <img src={condition.icon} alt={condition.text} className='size-48' />
        </div>
        <div className='flex flex-col justify-center gap-2 align-middle'>
          <h1 className='text-6xl'>{temperature}&#8451;</h1>
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
