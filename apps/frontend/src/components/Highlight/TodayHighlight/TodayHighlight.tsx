import UVIndexIcon from '@/assets/icons/weatherStatus/UVIndexIcon';
import HumidityIcon from '@/assets/icons/weatherStatus/HumidityIcon';
import HeatIndexIcon from '@/assets/icons/weatherStatus/HeatIndexIcon';
import VisibilityIcon from '@/assets/icons/weatherStatus/VisibilityIcon';
import WindIcon from '@/assets/icons/weatherStatus/WindIcon';
import RainPrecipitationIcon from '@/assets/icons/weatherStatus/RainPrecipitationIcon';
import { TodayHighlightTile } from '../TodayHighlightTile/TodayHighlightTile';

interface TodayHighlightProps {
  humidity: number;
  heatIndex: number;
  uv: number;
  precipitation: number;
  windSpeed: number;
  visibility: number;
}

export interface TodayHighlightTileProps {
  text: string;
  heading: string;
  icon?: JSX.Element; // Prop for the dynamic icon component
}

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
