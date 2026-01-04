import { useEffect, useState } from 'react'
import { fetchPopularMovies, fetchGenres, discoverMovies } from '../api/movies'
import type { Movie, Genre } from '../model/types'
import { MovieCard } from './MovieCard'
import { MovieDrawer } from './MovieDrawer'
import { FilterPanel } from './FilterPanel'
import { PaginationPanel } from './PaginationPanel'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import { EmptyState } from '../../../shared/ui/empty-state'

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
  const [genreFilter, setGenreFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Load genres on mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchGenres()
        setGenres(genresData.genres)
      } catch (err) {
        console.error('Failed to load genres:', err)
      }
    }
    loadGenres()
  }, [])

  // Load movies based on filters
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        setError(null)
        let moviesData: Awaited<ReturnType<typeof fetchPopularMovies>>
        
        const hasFilters = yearFilter || ratingFilter || genreFilter || searchQuery.trim()
        
        if (hasFilters) {
          // Use discover API for all filtering (including search)
          moviesData = await discoverMovies(currentPage, {
            year: yearFilter || undefined,
            minRating: ratingFilter || undefined,
            genreId: genreFilter || undefined,
            searchQuery: searchQuery.trim() || undefined,
          })
        } else {
          // Use popular movies when no filters or search
          moviesData = await fetchPopularMovies(currentPage)
        }
        
        setMovies(moviesData.results)
        setTotalPages(moviesData.total_pages)
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    // Debounce search input by 1000ms (1 second)
    // If search query changes, wait 1 second before loading
    // For other filters (year, rating, genre) or page changes, load immediately
    const timeoutId = setTimeout(() => {
      loadMovies()
    }, searchQuery.trim() ? 1000 : 0)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, currentPage, yearFilter, ratingFilter, genreFilter])

  if (loading) {
    return (
      <>
        <FilterPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          yearFilter={yearFilter}
          onYearChange={setYearFilter}
          ratingFilter={ratingFilter}
          onRatingChange={setRatingFilter}
          genreFilter={genreFilter}
          onGenreChange={setGenreFilter}
          availableYears={[]}
          availableGenres={genres}
          onClear={() => {
            setSearchQuery('')
            setYearFilter('')
            setRatingFilter('')
            setGenreFilter('')
          }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </>
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


  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedMovieId(null)
  }

  // API handles all filtering, no need for local filtering
  const filteredMovies = movies

  // Get all available years (generate range from current year back to 1900)
  const currentYear = new Date().getFullYear()
  const availableYears = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i
  )

  return (
    <div className="h-full flex flex-col">
      {/* Filters - Sticky */}
      <div className="sticky top-0 bg-gray-100 z-20 pb-2">
        <FilterPanel
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          yearFilter={yearFilter}
          onYearChange={setYearFilter}
          ratingFilter={ratingFilter}
          onRatingChange={setRatingFilter}
          genreFilter={genreFilter}
          onGenreChange={setGenreFilter}
          availableYears={availableYears}
          availableGenres={genres}
          onClear={() => {
            setSearchQuery('')
            setYearFilter('')
            setRatingFilter('')
            setGenreFilter('')
          }}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
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
        ) : (
          <EmptyState
            title="No movies found"
            message={
              searchQuery || yearFilter || ratingFilter
                ? 'Try adjusting your filters or search query'
                : 'No movies available at the moment'
            }
          />
        )}

        {/* Pagination */}
        <PaginationPanel
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <MovieDrawer
        movieId={selectedMovieId}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  )
}
