import { useEffect, useState } from 'react'
import { fetchMovieDetails, fetchMovieCredits } from '../api/movies'
import type { MovieDetails, CreditsResponse } from '../model/types'

type MovieDrawerProps = {
  movieId: number | null
  isOpen: boolean
  onClose: () => void
}

export const MovieDrawer = ({ movieId, isOpen, onClose }: MovieDrawerProps) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [credits, setCredits] = useState<CreditsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getWikipediaUrl = (name: string): string => {
    const encodedName = name.replace(/\s+/g, '_')
    return `https://en.wikipedia.org/wiki/${encodedName}`
  }

  useEffect(() => {
    if (movieId && isOpen) {
      const loadMovieData = async () => {
        try {
          setLoading(true)
          setError(null)
          const [details, creditsData] = await Promise.all([
            fetchMovieDetails(movieId),
            fetchMovieCredits(movieId),
          ])
          setMovieDetails(details)
          setCredits(creditsData)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load movie details')
        } finally {
          setLoading(false)
        }
      }

      loadMovieData()
    }
  }, [movieId, isOpen])

  const backdropUrl = movieDetails?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`
    : null

  const posterUrl = movieDetails?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : null

  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-600">Loading movie details...</div>
          </div>
        )}

        {error && (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold">Error loading movie details</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {movieDetails && !loading && (
          <div>
            {/* Header with backdrop */}
            <div className="relative h-64">
              {backdropUrl ? (
                <img
                  src={backdropUrl}
                  alt={movieDetails.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-white/50 text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
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
                    <p className="text-sm">No backdrop available</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                style={{ padding: '4px', borderRadius: '50%', backgroundColor: 'white' }}
                aria-label="Close drawer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Title and basic info */}
              <div className="flex gap-6 mb-6">
                {posterUrl && (
                  <img
                    src={posterUrl}
                    alt={movieDetails.title}
                    className="w-48 h-72 object-cover rounded-lg shadow-md flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {movieDetails.title}
                  </h1>
                  {movieDetails.tagline && (
                    <p className="text-lg text-gray-600 italic mb-4">{movieDetails.tagline}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movieDetails.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">{movieDetails.vote_average.toFixed(1)}</span>
                      <span className="text-gray-500">({movieDetails.vote_count.toLocaleString()} votes)</span>
                    </div>
                    {movieDetails.runtime && (
                      <div>
                        <span className="font-medium">Runtime:</span> {movieDetails.runtime} minutes
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Release Date:</span>{' '}
                      {new Date(movieDetails.release_date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {movieDetails.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview */}
              {movieDetails.overview && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Overview</h2>
                  <p className="text-gray-700 leading-relaxed">{movieDetails.overview}</p>
                </div>
              )}

              {/* Cast */}
              {credits && credits.cast.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Cast</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {credits.cast.slice(0, 10).map((actor) => (
                        <div key={actor.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                          <div>
                            <a
                              href={getWikipediaUrl(actor.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {actor.name}
                            </a>
                            <div className="text-xs text-gray-600">{actor.character}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {credits.cast.length > 10 && (
                      <p className="text-sm text-gray-500 mt-3 pt-2 border-t border-gray-200">
                        and {credits.cast.length - 10} more...
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* All movie data in a structured format */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Movie Details</h2>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">Original Title:</span>{' '}
                      <span className="text-gray-600">{movieDetails.original_title}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Original Language:</span>{' '}
                      <span className="text-gray-600">{movieDetails.original_language}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Popularity:</span>{' '}
                      <span className="text-gray-600">{movieDetails.popularity.toFixed(2)}</span>
                    </div>
                    {movieDetails.imdb_id && (
                      <div>
                        <span className="font-semibold text-gray-700">IMDb ID:</span>{' '}
                        <span className="text-gray-600">{movieDetails.imdb_id}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-gray-700">Adult:</span>{' '}
                      <span className="text-gray-600">{movieDetails.adult ? 'Yes' : 'No'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Video:</span>{' '}
                      <span className="text-gray-600">{movieDetails.video ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                {(movieDetails.budget > 0 || movieDetails.revenue > 0) && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Financial Information</h2>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {movieDetails.budget > 0 && (
                        <div>
                          <span className="font-semibold text-gray-700">Budget:</span>{' '}
                          <span className="text-gray-600">
                            ${movieDetails.budget.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {movieDetails.revenue > 0 && (
                        <div>
                          <span className="font-semibold text-gray-700">Revenue:</span>{' '}
                          <span className="text-gray-600">
                            ${movieDetails.revenue.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Production Companies */}
                {movieDetails.production_companies.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Production Companies</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-wrap gap-4">
                        {movieDetails.production_companies.map((company) => (
                          <div key={company.id} className="flex items-center gap-2">
                            {company.logo_path && (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                alt={company.name}
                                className="h-8 object-contain"
                              />
                            )}
                            <span className="text-gray-700">{company.name}</span>
                            {company.origin_country && (
                              <span className="text-xs text-gray-500">({company.origin_country})</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Production Countries */}
                {movieDetails.production_countries.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Production Countries</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2">
                        {movieDetails.production_countries.map((country, index) => (
                          <span
                            key={country.iso_3166_1}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {country.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Spoken Languages */}
                {movieDetails.spoken_languages.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Spoken Languages</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2">
                        {movieDetails.spoken_languages.map((language) => (
                          <span
                            key={language.iso_639_1}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {language.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Belongs to Collection */}
                {movieDetails.belongs_to_collection && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Collection</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-700">
                        {movieDetails.belongs_to_collection.name}
                      </div>
                    </div>
                  </div>
                )}

                {/* Homepage */}
                {movieDetails.homepage && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Links</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <a
                        href={movieDetails.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Official Homepage
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
