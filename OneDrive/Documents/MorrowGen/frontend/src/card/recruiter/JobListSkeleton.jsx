export const JobListSkeleton = ({ mode }) => {
  const cardBg = mode === 'dark' ? "bg-[#1B2E31]" : "bg-white";
  const borderColor = mode === 'dark' ? "border-[#294B4E]" : "border-gray-200";
  const skeletonBase = mode === 'dark' ? 'bg-[#294B4E]' : 'bg-gray-200';

  return (
    <div className={`${cardBg} border-2 ${borderColor} rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm`}>
      {/* Company Logo + Title + Icons */}
      <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
        {/* Logo Skeleton */}
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${skeletonBase} animate-pulse flex-shrink-0`}></div>

        <div className="flex-1 min-w-0 space-y-2">
          {/* Title Skeleton */}
          <div className={`h-5 md:h-6 ${skeletonBase} rounded animate-pulse w-3/4`}></div>
          {/* Company Skeleton */}
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-1/2`}></div>
        </div>

        {/* Icons Skeleton */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className={`h-9 w-9 rounded-lg ${skeletonBase} animate-pulse`}></div>
          <div className={`h-9 w-9 rounded-lg ${skeletonBase} animate-pulse`}></div>
        </div>
      </div>

      {/* Location, Type, Posted Skeleton */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-3 md:mb-4">
        <div className={`h-4 ${skeletonBase} rounded animate-pulse w-20`}></div>
        <div className={`h-4 ${skeletonBase} rounded animate-pulse w-24`}></div>
        <div className={`h-4 ${skeletonBase} rounded animate-pulse w-16`}></div>
      </div>

      {/* Description Skeleton */}
      <div className="mb-3 md:mb-4 space-y-2">
        <div className={`h-4 ${skeletonBase} rounded animate-pulse w-full`}></div>
        <div className={`h-4 ${skeletonBase} rounded animate-pulse w-5/6`}></div>
        <div className={`h-4 ${skeletonBase} rounded animate-pulse w-4/6`}></div>
      </div>

      {/* Skills Skeleton */}
      <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
        <div className={`h-7 ${skeletonBase} rounded-md animate-pulse w-16`}></div>
        <div className={`h-7 ${skeletonBase} rounded-md animate-pulse w-20`}></div>
        <div className={`h-7 ${skeletonBase} rounded-md animate-pulse w-24`}></div>
        <div className={`h-7 ${skeletonBase} rounded-md animate-pulse w-14`}></div>
      </div>

      {/* Bottom: Salary + Experience Skeleton */}
      <div className={`flex items-center justify-between gap-2 pt-3 md:pt-4 border-t ${borderColor}`}>
        <div className="flex items-center gap-2 md:gap-4">
          <div className={`h-5 ${skeletonBase} rounded animate-pulse w-20`}></div>
          <div className={`h-6 ${skeletonBase} rounded animate-pulse w-16`}></div>
        </div>
      </div>
    </div>
  );
};

export default JobList;