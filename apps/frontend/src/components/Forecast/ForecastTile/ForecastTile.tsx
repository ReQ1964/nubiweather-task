interface ForecastTileProps {
  topInfo: string;
  temperature: number;
  weatherIcon: string;
  weatherText: string;
  first: boolean;
}

const ForecastTile = ({
  topInfo,
  temperature,
  weatherIcon,
  weatherText,
  first,
}: ForecastTileProps) => {
  return (
    <div
      className={`flex w-32 flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 text-center font-semibold shadow-md ${
        first ? 'border-t-8 border-blue-200 pt-2 shadow-2xl' : ''
      }`}
    >
      <p className="text-sm">{topInfo}</p>
      <img
        src={weatherIcon}
        alt={weatherText}
        className="size-12 self-center"
      />
      <p className="text-lg">{temperature}&#8451;</p>
    </div>
  );
};

export default ForecastTile;
