import type { Movie, Genre } from '../model/types'

type MovieCardProps = {
  movie: Movie
  genres: Genre[]
}

export const MovieCard = ({ movie, genres }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

  // Map genre IDs to genre names
  const movieGenres = movie.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter((name): name is string => name !== undefined)
    .slice(0, 3) // Show max 3 genres

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-96 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{movie.title}</h3>
        {movieGenres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {movieGenres.map((genreName) => (
              <span
                key={genreName}
                className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {genreName}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{movie.overview}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {new Date(movie.release_date).getFullYear()}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold text-gray-700">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
