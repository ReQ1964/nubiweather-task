import UVIndexIcon from '@/assets/icons/weatherStatus/UVIndexIcon';
import HumidityIcon from '@/assets/icons/weatherStatus/HumidityIcon';
import HeatIndexIcon from '@/assets/icons/weatherStatus/HeatIndexIcon';
import VisibilityIcon from '@/assets/icons/weatherStatus/VisibilityIcon';
import WindIcon from '@/assets/icons/weatherStatus/WindIcon';
import RainPrecipitationIcon from '@/assets/icons/weatherStatus/RainPrecipitationIcon';

interface TodayHighlightProps {
  humidity: number;
  heatIndex: number;
  uv: number;
  precipitation: number;
  windSpeed: number;
  visibility: number;
}

interface TodayHighlightTileProps {
  text: string;
  heading: string;
  icon?: JSX.Element; // Prop for the dynamic icon component
}

const TodayHighlightTile = ({
  text,
  heading,
  icon,
}: TodayHighlightTileProps) => (
  <div className='flex size-40 flex-col justify-self-center rounded-md border border-gray-200 bg-white p-4 pt-3 text-left align-middle shadow-xl sm:h-44 sm:w-52'>
    <div className='flex items-center gap-2'>
      {icon}
      <h3 className='text-base text-gray-500 sm:text-lg'>{heading}</h3>
    </div>
    <div className='flex flex-1 flex-col items-center justify-center gap-4 text-center font-semibold'>
      <h4 className='text-2xl sm:text-3xl'>{text}</h4>
    </div>
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
        {/* Pass different icons for each tile */}
        <TodayHighlightTile
          heading='UV Index'
          text={uv.toString()}
          icon={<UVIndexIcon />}
        />
        <TodayHighlightTile
          heading='Wind Speed'
          text={`${windSpeed} km/h`}
          icon={<WindIcon />}
        />
        <TodayHighlightTile
          heading='Visibility'
          text={`${visibility} km`}
          icon={<VisibilityIcon />}
        />
        <TodayHighlightTile
          heading='Humidity'
          text={`${humidity}%`}
          icon={<HumidityIcon />}
        />
        <TodayHighlightTile
          heading='Rain Chance'
          text={`${precipitation} mm`}
          icon={<RainPrecipitationIcon />}
        />
        <TodayHighlightTile
          heading='Heat Index'
          text={`${heatIndex}°C`}
          icon={<HeatIndexIcon />}
        />
      </section>
    </main>
  );
};

export default TodayHighlight;
