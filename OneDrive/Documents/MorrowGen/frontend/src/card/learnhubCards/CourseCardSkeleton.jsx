export default function CourseCardSkeleton({ count = 6 }) {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="relative">
            <div className="w-full h-48 bg-gray-300" />
            
            {/* Top badges skeleton */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <div className="bg-gray-400 h-6 w-16 rounded-full" />
              <div className="bg-gray-400 h-6 w-20 rounded-full" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Author info skeleton */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>

            {/* Title skeleton */}
            <div className="space-y-2 mb-2">
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
            </div>

            {/* Description skeleton */}
            <div className="space-y-2 mb-4 mt-3">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>

            {/* Metadata skeleton */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-3 w-16 bg-gray-300 rounded" />
              <div className="h-3 w-12 bg-gray-300 rounded" />
              <div className="h-3 w-20 bg-gray-300 rounded" />
            </div>

            {/* Button skeleton */}
            <div className="w-full h-10 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg" />
          </div>
        </div>
      ))}
    </>
  );
}