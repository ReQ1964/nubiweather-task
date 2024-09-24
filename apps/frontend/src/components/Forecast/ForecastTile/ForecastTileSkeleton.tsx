/* eslint-disable tailwindcss/no-custom-classname */
const ForecastTileSkeleton = () => {
  return (
    <div className="flex w-32 shrink-0 flex-col rounded-lg bg-white p-4 text-center  shadow-xl">
      <p className="animate-skeletonLoading mx-auto mb-4 h-4 w-5/6 rounded-lg"></p>
      <div className="animate-skeletonLoading mb-4 size-12 self-center rounded-full"></div>
      <p className="animate-skeletonLoading  mx-auto h-4 w-5/6 rounded-lg"></p>
    </div>
  );
};

export default ForecastTileSkeleton;
