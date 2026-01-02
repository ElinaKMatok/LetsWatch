import type { Movie, Genre } from '../model/types'

type MovieCardProps = {
  movie: Movie
  genres: Genre[]
  onClick?: () => void
}

export const MovieCard = ({ movie, genres, onClick }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  // Map genre IDs to genre names
  const movieGenres = movie.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter((name): name is string => name !== undefined)

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-base text-gray-900 mb-1.5 line-clamp-2">{movie.title}</h3>
        {movieGenres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {movieGenres.map((genreName) => (
              <span
                key={genreName}
                className="px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {genreName}
              </span>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{movie.overview}</p>
        <div className="flex items-center justify-between text-xs mt-auto">
          <span className="text-gray-500">
            {new Date(movie.release_date).getFullYear()}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-xs">⭐</span>
            <span className="font-semibold text-gray-700">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
