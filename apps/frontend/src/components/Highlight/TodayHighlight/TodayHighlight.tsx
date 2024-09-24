import { useContext } from 'react';
import UVIndexIcon from '@/assets/icons/weatherStatus/UVIndexIcon';
import HumidityIcon from '@/assets/icons/weatherStatus/HumidityIcon';
import HeatIndexIcon from '@/assets/icons/weatherStatus/HeatIndexIcon';
import VisibilityIcon from '@/assets/icons/weatherStatus/VisibilityIcon';
import WindIcon from '@/assets/icons/weatherStatus/WindIcon';
import RainPrecipitationIcon from '@/assets/icons/weatherStatus/RainPrecipitationIcon';
import { TodayHighlightTile } from '../TodayHighlightTile/TodayHighlightTile';
import { useApiData } from '@/hooks/useApiData/useApiData';
import { CurrentCityContext } from '@/App';
import { TodayHighlightSchema } from 'shared-schemas/apiSchemas';
import { TodayHighlightSchemaType } from 'shared-types/apiTypes';
import { TodayHighlightSkeleton } from '../TodayHighlightTile/TodayHighlightTileSkeleton';
import { useDataFetching } from '@/hooks/useDataFetching/useDataFetching';

const TodayHighlight = () => {
  const { currentCity } = useContext(CurrentCityContext);

  const fetchResult = useApiData<TodayHighlightSchemaType>(
    currentCity,
    'http://localhost:5000/todayHighlight',
    TodayHighlightSchema,
  );

  return useDataFetching({
    fetchResult,
    loadingComponent: <TodayHighlightSkeleton />,
    errorClassName: 'h-full min-h-[370px]',
    renderData: (data) => {
      const { humidity, uv, wind_kph, precip_mm, vis_km, heatindex_c } = data;
      return (
        <main>
          <h2 className="mb-6 text-lg font-bold">Today&apos;s Highlights</h2>
          <section className="grid grid-cols-2 gap-7 md:grid-cols-3">
            <TodayHighlightTile
              heading="UV Index"
              text={uv}
              icon={<UVIndexIcon />}
            />
            <TodayHighlightTile
              heading="Wind Speed"
              text={`${wind_kph} km/h`}
              icon={<WindIcon />}
            />
            <TodayHighlightTile
              heading="Visibility"
              text={`${vis_km} km`}
              icon={<VisibilityIcon />}
            />
            <TodayHighlightTile
              heading="Humidity"
              text={`${humidity}%`}
              icon={<HumidityIcon />}
            />
            <TodayHighlightTile
              heading="Rain Chance"
              text={`${precip_mm} mm`}
              icon={<RainPrecipitationIcon />}
            />
            <TodayHighlightTile
              heading="Heat Index"
              text={`${heatindex_c}°C`}
              icon={<HeatIndexIcon />}
            />
          </section>
        </main>
      );
    },
  });
};

export default TodayHighlight;
