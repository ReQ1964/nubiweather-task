interface ForecastTileProps {
  topInfo: string;
  temperature: number;
  weatherIcon: string;
  weatherText: string;
}

const ForecastTile = ({
  topInfo,
  temperature,
  weatherIcon,
  weatherText,
}: ForecastTileProps) => {
  return (
    <div className='flex w-32 flex-col  gap-1 rounded-md border border-gray-200 bg-white p-4 text-center  shadow-xl'>
      <p className='text-sm font-medium text-sky-950'>{topInfo}</p>
      <img
        src={weatherIcon}
        alt={weatherText}
        className='size-12 self-center'
      />
      <p className='text-lg font-semibold text-sky-950'>{temperature}&#8451;</p>
    </div>
  );
};

export default ForecastTile;
