interface TodayHighlightTileProps {
  text: string;
  heading: string;
  icon: React.ReactNode;
}

export const TodayHighlightTile = ({
  text,
  heading,
  icon,
}: TodayHighlightTileProps) => (
  <div className="flex size-36 flex-col justify-self-center rounded-3xl border border-gray-200 bg-white p-4 pt-3 text-left align-middle shadow-xl sm:h-44 sm:w-52">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="text-base text-gray-500 sm:text-lg">{heading}</h3>
    </div>
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center font-semibold">
      <h4 className="text-2xl sm:text-3xl">{text}</h4>
    </div>
  </div>
);
