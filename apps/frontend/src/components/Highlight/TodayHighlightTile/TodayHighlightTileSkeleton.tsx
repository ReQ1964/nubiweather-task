/* eslint-disable tailwindcss/no-custom-classname */
const TodayHighlightTileSkeleton = () => (
  <div className="flex size-40 flex-col justify-self-center rounded-3xl border border-gray-200 bg-white p-4 pt-3 text-left shadow-xl sm:h-44 sm:w-52">
    <div className="flex gap-2 rounded-lg">
      <div className="animate-skeletonLoading size-8 shrink-0 rounded-full"></div>
      <div className="animate-skeletonLoading h-5 w-3/5 self-center rounded-lg"></div>
    </div>
    <div className="flex flex-1 justify-center gap-4 text-center font-semibold ">
      <div className="animate-skeletonLoading h-7 w-1/2 self-center rounded-lg"></div>
    </div>
  </div>
);

export const TodayHighlightSkeleton = () => (
  <section className="">
    <h2 className="mb-6 text-xl font-bold text-white">
      Today&apos;s Highlights
    </h2>
    <main className="grid grid-cols-2 gap-8 gap-x-24 p-4 md:grid-cols-3 lg:px-8 ">
      {[...Array(6)].map((_, i) => (
        <TodayHighlightTileSkeleton key={i} />
      ))}
    </main>
  </section>
);

export default TodayHighlightTileSkeleton;
