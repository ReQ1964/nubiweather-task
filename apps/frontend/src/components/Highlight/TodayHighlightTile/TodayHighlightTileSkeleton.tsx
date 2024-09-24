/* eslint-disable tailwindcss/no-custom-classname */
const TodayHighlightTileSkeleton = () => (
  <div className="flex size-40 flex-col justify-self-center rounded-md border border-gray-200 bg-white p-4 pt-3 text-left shadow-xl sm:h-44 sm:w-52">
    <div className="flex justify-center gap-2">
      <div className="animate-skeletonLoading size-6 shrink-0 rounded-full"></div>
      <div className="animate-skeletonLoading h-4 w-full self-center"></div>
    </div>
    <div className="flex flex-1 justify-center gap-4 text-center font-semibold">
      <div className="animate-skeletonLoading h-6 w-1/2 self-center"></div>
    </div>
  </div>
);

export const TodayHighlightSkeleton = () => (
  <section className="grid grid-cols-2 gap-14 gap-y-7 md:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <TodayHighlightTileSkeleton key={i} />
    ))}
  </section>
);

export default TodayHighlightTileSkeleton;
