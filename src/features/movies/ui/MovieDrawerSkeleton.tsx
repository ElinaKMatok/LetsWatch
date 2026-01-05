export const MovieDrawerSkeleton = () => {
  return (
    <div className="h-full overflow-y-auto p-6 animate-pulse">
      {/* Backdrop Skeleton */}
      <div className="w-full h-64 bg-gray-200 rounded-lg mb-6"></div>

      {/* Title and Basic Info Skeleton */}
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex gap-4 mb-4">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-18"></div>
        </div>
      </div>

      {/* Overview Skeleton */}
      <div className="mb-6">
        <div className="h-5 bg-gray-200 rounded w-32 mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>

      {/* Details Grid Skeleton */}
      <div className="mb-6">
        <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-36"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>

      {/* Cast Section Skeleton */}
      <div className="mb-6">
        <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Companies Skeleton */}
      <div className="mb-6">
        <div className="h-5 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-6 bg-gray-200 rounded w-24"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
