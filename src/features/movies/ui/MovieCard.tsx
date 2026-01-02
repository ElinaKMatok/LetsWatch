import { useState } from 'react'
import type { Movie, Genre } from '../model/types'

type MovieCardProps = {
  movie: Movie
  genres: Genre[]
  onClick?: () => void
}

export const MovieCard = ({ movie, genres, onClick }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false)
  
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null

  // Map genre IDs to genre names
  const movieGenres = movie.genre_ids
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter((name): name is string => name !== undefined)

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="w-full aspect-[2/3] bg-gray-100 overflow-hidden flex items-center justify-center">
        {posterUrl && !imageError ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 p-4 text-center">
            <svg
              className="w-12 h-12 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">No Image</span>
          </div>
        )}
      </div>
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
