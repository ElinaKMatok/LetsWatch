type EmptyStateProps = {
  title?: string
  message?: string
  icon?: React.ReactNode
}

export const EmptyState = ({
  title = 'No movies found',
  message = 'Try adjusting your filters or search query',
  icon,
}: EmptyStateProps) => {
  const defaultIcon = (
    <svg
      className="w-20 h-20 text-gray-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-4 text-gray-400">
        {icon || defaultIcon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {message && (
        <p className="text-sm text-gray-500 text-center max-w-md">{message}</p>
      )}
    </div>
  )
}
