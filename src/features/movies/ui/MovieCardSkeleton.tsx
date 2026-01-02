export const MovieCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full animate-pulse">
      <div className="w-full aspect-[2/3] bg-gray-200" />
      <div className="p-3 flex flex-col flex-1">
        <div className="h-4 bg-gray-200 rounded mb-1.5 w-3/4" />
        <div className="flex gap-1 mb-1.5">
          <div className="h-5 w-16 bg-gray-200 rounded-full" />
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
        </div>
        <div className="h-3 bg-gray-200 rounded mb-1 w-full" />
        <div className="h-3 bg-gray-200 rounded mb-2 w-2/3" />
        <div className="flex items-center justify-between mt-auto">
          <div className="h-3 w-12 bg-gray-200 rounded" />
          <div className="h-3 w-8 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
