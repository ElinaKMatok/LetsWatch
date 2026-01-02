import { useEffect, useState } from 'react'
import { fetchPopularMovies, fetchGenres, searchMovies } from '../api/movies'
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
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('movieListPage')
    return savedPage ? parseInt(savedPage, 10) : 1
  })
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

  // Load popular movies or search results
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        setError(null)
        let moviesData: Awaited<ReturnType<typeof fetchPopularMovies>>
        
        if (searchQuery.trim()) {
          moviesData = await searchMovies(searchQuery.trim(), currentPage)
        } else {
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

    // Debounce search by 1 second
    const timeoutId = setTimeout(() => {
      loadMovies()
    }, searchQuery.trim() ? 1000 : 0)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, currentPage])

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
          availableYears={[]}
          onClear={() => {
            setSearchQuery('')
            setYearFilter('')
            setRatingFilter('')
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

  // Filter movies by year and rating (search is now done via API)
  const filteredMovies = movies.filter((movie) => {
    // Year filter
    const movieYear = new Date(movie.release_date).getFullYear().toString()
    const yearMatch = !yearFilter || movieYear === yearFilter

    // Rating filter (minimum rating)
    const minRating = ratingFilter ? parseFloat(ratingFilter) : 0
    const ratingMatch = movie.vote_average >= minRating

    return yearMatch && ratingMatch
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
      {!yearFilter && !ratingFilter && (
        <PaginationPanel
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <MovieDrawer
        movieId={selectedMovieId}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  )
}
