import dayjs from 'dayjs';

interface WeatherOverviewPropsInterface {
  city: string;
  country: string;
  localtime: string;
  temperature: string;
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
}: WeatherOverviewPropsInterface): JSX.Element => {
  const date = dayjs(localtime.split(' ')[0]);
  const dayName = date.format('dddd');
  const monthName = date.format('MMMM');
  const dayOfTheMonth = date.get('date');

  return (
    <section className='p-3'>
      <header>
        <h2 className='text-3xl'>
          {city}, {country}
        </h2>
        <p>
          {dayName}, {dayOfTheMonth} {monthName}
        </p>
      </header>
      <main className='flex flex-row align-middle'>
        <div>
          {condition.icon ? (
            <img
              src={condition.icon}
              alt={condition.text}
              className='size-48'
            />
          ) : (
            <div>LOGO</div>
          )}
        </div>
        <div className='flex flex-col justify-center align-middle'>
          <h1 className='text-6xl'>{temperature}&#8451;</h1>
          <p>{condition.text}</p>
        </div>
      </main>
    </section>
  );
};

export default WeatherOverview;
