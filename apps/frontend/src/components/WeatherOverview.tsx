import dayjs from 'dayjs';
import cityImg from '@/assets/img/city-bg.jpg';
import CitySelectInput from './CitySelectInput';

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
  condition,
}: WeatherOverviewProps): JSX.Element => {
  const date = dayjs(localtime.split(' ')[0]);
  const dayName = date.format('dddd');
  const monthName = date.format('MMMM');
  const dayOfTheMonth = date.get('date');

  return (
    <section className='flex flex-col px-4 py-6 lg:w-3/12 lg:rounded-l-3xl lg:p-8'>
      <header className='flex flex-col gap-4'>
        <nav className='relative flex flex-col gap-4'>
          <h2 className='mr-7 text-3xl'>
            {city}, {country}
          </h2>
          <p>
            {dayName}, {dayOfTheMonth} {monthName}
          </p>
          <CitySelectInput />
        </nav>
      </header>
      <main className='flex flex-row justify-center pb-6 pt-10 align-middle sm:py-12 lg:flex-col lg:py-0 lg:pt-6 lg:text-center'>
        <img
          src={condition.icon}
          alt={condition.text}
          className='size-28 lg:self-center'
        />
        <div className='flex flex-col justify-center gap-2 align-middle'>
          <h1 className='text-5xl'>{temperature}&#8451;</h1>
          <p>{condition.text}</p>
        </div>
      </main>
      <img
        src={cityImg}
        alt='A generic city'
        className='mt-auto hidden rounded-2xl brightness-90 lg:block'
      />
    </section>
  );
};

export default WeatherOverview;
