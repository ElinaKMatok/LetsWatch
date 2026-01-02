import { useEffect, useState } from 'react'
import { fetchPopularMovies, fetchGenres } from '../api/movies'
import type { Movie, Genre } from '../model/types'
import { MovieCard } from './MovieCard'
import { MovieDrawer } from './MovieDrawer'
import { FilterPanel } from './FilterPanel'

export const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [yearFilter, setYearFilter] = useState<string>('')
  const [ratingFilter, setRatingFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('movieListPage')
    return savedPage ? parseInt(savedPage, 10) : 1
  })
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        setError(null)
        const [moviesData, genresData] = await Promise.all([
          fetchPopularMovies(currentPage),
          fetchGenres(),
        ])
        setMovies(moviesData.results)
        setTotalPages(moviesData.total_pages)
        setGenres(genresData.genres)
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [currentPage])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading movies...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 font-semibold">Error loading movies</p>
        <p className="text-red-600 text-sm mt-1">{error}</p>
        <p className="text-red-600 text-xs mt-2">
          Make sure you have set VITE_TMDB_API_KEY in your .env file
        </p>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">No movies found</div>
    )
  }

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedMovieId(null)
  }

  // Filter movies by search query, year, and rating
  const filteredMovies = movies.filter((movie) => {
    // Search filter (name or genre)
    const query = searchQuery.toLowerCase()
    const titleMatch = movie.title.toLowerCase().includes(query)
    const genreMatch = movie.genre_ids.some((genreId) => {
      const genre = genres.find((g) => g.id === genreId)
      return genre?.name.toLowerCase().includes(query)
    })
    const searchMatch = !searchQuery || titleMatch || genreMatch

    // Year filter
    const movieYear = new Date(movie.release_date).getFullYear().toString()
    const yearMatch = !yearFilter || movieYear === yearFilter

    // Rating filter (minimum rating)
    const minRating = ratingFilter ? parseFloat(ratingFilter) : 0
    const ratingMatch = movie.vote_average >= minRating

    return searchMatch && yearMatch && ratingMatch
  })

  // Get unique years from movies for the year filter dropdown
  const availableYears = Array.from(
    new Set(
      movies
        .map((movie) => new Date(movie.release_date).getFullYear())
        .filter((year) => !isNaN(year))
        .sort((a, b) => b - a)
    )
  )

  return (
    <>
      {/* Filters */}
      <FilterPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        yearFilter={yearFilter}
        onYearChange={setYearFilter}
        ratingFilter={ratingFilter}
        onRatingChange={setRatingFilter}
        availableYears={availableYears}
        onClear={() => {
          setSearchQuery('')
          setYearFilter('')
          setRatingFilter('')
        }}
      />

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genres={genres}
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      ) : searchQuery || yearFilter || ratingFilter ? (
        <div className="text-center py-12 text-gray-600">
          No movies found matching your filters
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genres={genres}
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!searchQuery && !yearFilter && !ratingFilter && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => {
              const newPage = Math.max(1, currentPage - 1)
              setCurrentPage(newPage)
              localStorage.setItem('movieListPage', newPage.toString())
            }}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
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
                  onClick={() => {
                    setCurrentPage(pageNum)
                    localStorage.setItem('movieListPage', pageNum.toString())
                  }}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    currentPage === pageNum
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => {
              const newPage = Math.min(totalPages, currentPage + 1)
              setCurrentPage(newPage)
              localStorage.setItem('movieListPage', newPage.toString())
            }}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      <MovieDrawer
        movieId={selectedMovieId}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  )
}
