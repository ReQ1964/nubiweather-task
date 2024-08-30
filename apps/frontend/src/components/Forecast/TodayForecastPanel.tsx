import { useForecastData } from '@/hooks/useForecastData';
import { CityName } from 'shared-types/apiTypes';

const TodayForecastPanel = ({ currentCity }: { currentCity: CityName }) => {
  const { data, error, isError, isLoading } = useForecastData(currentCity, 1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error?.message || 'An unexpected error occurred'}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return <div></div>;
};

export default TodayForecastPanel;
