/* eslint-disable tailwindcss/no-custom-classname */
const ForecastTileSkeleton = () => {
  return (
    <div className='flex w-32 shrink-0 flex-col rounded-md bg-white p-4 text-center  shadow-xl'>
      <p className='animate-skeletonLoading mb-3 h-4'></p>
      <div className='animate-skeletonLoading mb-3 size-12 self-center rounded-full'></div>
      <p className='animate-skeletonLoading  h-4 '></p>
    </div>
  );
};

export default ForecastTileSkeleton;
