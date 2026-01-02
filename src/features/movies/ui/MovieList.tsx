import { useEffect, useState } from 'react'
import { fetchPopularMovies, fetchGenres } from '../api/movies'
import type { Movie, Genre } from '../model/types'
import { MovieCard } from './MovieCard'
import { MovieDrawer } from './MovieDrawer'

export const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        setError(null)
        const [moviesData, genresData] = await Promise.all([
          fetchPopularMovies(),
          fetchGenres(),
        ])
        setMovies(moviesData.results)
        setGenres(genresData.genres)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

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

  // Filter movies by search query (name or genre)
  const filteredMovies = movies.filter((movie) => {
    const query = searchQuery.toLowerCase()
    const titleMatch = movie.title.toLowerCase().includes(query)
    
    // Check if any genre matches the search query
    const genreMatch = movie.genre_ids.some((genreId) => {
      const genre = genres.find((g) => g.id === genreId)
      return genre?.name.toLowerCase().includes(query)
    })
    
    return titleMatch || genreMatch
  })

  return (
    <>
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search movies by name or genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

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
      ) : searchQuery ? (
        <div className="text-center py-12 text-gray-600">
          No movies found matching "{searchQuery}"
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
      <MovieDrawer
        movieId={selectedMovieId}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  )
}
