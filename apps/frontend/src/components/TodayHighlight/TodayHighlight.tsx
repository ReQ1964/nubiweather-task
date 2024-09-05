import { ReactNode } from 'react';

interface TodayHighlightProps {
  humidity: number;
  heatIndex: number;
  uv: number;
  precipitation: number;
  windSpeed: number;
  visibility: number;
}

const TodayHighlightTile = ({
  children,
  heading,
}: {
  children: ReactNode;
  heading: string;
}) => (
  <div className='size-48 justify-self-center rounded-md border border-gray-200 bg-white p-4 pt-3 text-left shadow-xl'>
    <h3 className='mb-4  text-gray-500'>{heading}</h3>
    <div className='flex flex-col gap-4'>{children}</div>
  </div>
);

const TodayHighlight = ({
  humidity,
  heatIndex,
  uv,
  precipitation,
  windSpeed,
  visibility,
}: TodayHighlightProps) => {
  return (
    <main>
      <h2 className='mb-6 text-lg font-bold'>Today&apos;s Highlights</h2>
      <section className='grid grid-cols-2 gap-7 md:grid-cols-3'>
        <TodayHighlightTile heading='UV Index'>
          <h4 className='text-3xl font-semibold'>{uv}</h4>
        </TodayHighlightTile>
        <TodayHighlightTile heading='Wind Status'>
          <h4 className='text-3xl font-semibold'>{windSpeed} km/h</h4>
        </TodayHighlightTile>
        <TodayHighlightTile heading='Visibility'>
          <h4 className='text-3xl font-semibold'>{visibility} km</h4>
        </TodayHighlightTile>
        <TodayHighlightTile heading='Humidity'>
          <h4 className='text-3xl font-semibold'>{humidity}%</h4>
        </TodayHighlightTile>
        <TodayHighlightTile heading='Rain Chance'>
          <h4 className='text-3xl font-semibold'>{precipitation} mm</h4>
        </TodayHighlightTile>
        <TodayHighlightTile heading='Heat Index'>
          <h4 className='text-3xl font-semibold'>{heatIndex}°C</h4>
        </TodayHighlightTile>
      </section>
    </main>
  );
};

export default TodayHighlight;
