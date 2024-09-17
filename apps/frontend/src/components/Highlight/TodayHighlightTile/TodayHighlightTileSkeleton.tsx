/* eslint-disable tailwindcss/no-custom-classname */

const TodayHighlightTileSkeleton = () => {
  return (
    <div className='flex size-40 flex-col justify-self-center rounded-md border border-gray-200 bg-white p-4 pt-3 text-left align-middle shadow-xl sm:h-44 sm:w-52'>
      <div className='flex justify-center gap-2 align-middle'>
        <div className='animate-skeletonLoading size-6 shrink-0 rounded-full'></div>
        <div className='animate-skeletonLoading h-4 w-full self-center '></div>
      </div>
      <div className='flex flex-1 justify-center gap-4 text-center font-semibold'>
        <div className='animate-skeletonLoading h-6 w-1/2 self-center justify-self-center '></div>
      </div>
    </div>
  );
};

export const TodayHighlightSkeleton = () => {
  return (
    <section className='grid grid-cols-2 gap-7 md:grid-cols-3'>
      <TodayHighlightTileSkeleton />
      <TodayHighlightTileSkeleton />
      <TodayHighlightTileSkeleton />
      <TodayHighlightTileSkeleton />
      <TodayHighlightTileSkeleton />
      <TodayHighlightTileSkeleton />
    </section>
  );
};
export default TodayHighlightTileSkeleton;
