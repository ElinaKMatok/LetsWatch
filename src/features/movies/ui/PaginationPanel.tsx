type PaginationPanelProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const PaginationPanel = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationPanelProps) => {
  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    onPageChange(page)
    localStorage.setItem('movieListPage', page.toString())
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        &lt;
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum: number
          if (totalPages <= 5) {
            pageNum = i + 1
          } else if (currentPage <= 3) {
            pageNum = i + 1
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i
          } else {
            pageNum = currentPage - 2 + i
          }

          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                currentPage === pageNum
                  ? 'bg-blue-500 border-blue-500 text-blue-500'
                  : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
              }`}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        &gt;
      </button>
    </div>
  )
}
