import type { MoviesResponse, GenresResponse, MovieDetails, CreditsResponse } from '../model/types'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || ''
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchPopularMovies = async (page: number = 1): Promise<MoviesResponse> => {
  if (!API_KEY) {
    throw new Error('TMDb API key is not configured. Please set VITE_TMDB_API_KEY in your .env file')
  }

  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`)
  }

  return response.json()
}

export const fetchGenres = async (): Promise<GenresResponse> => {
  if (!API_KEY) {
    throw new Error('TMDb API key is not configured. Please set VITE_TMDB_API_KEY in your .env file')
  }

  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.statusText}`)
  }

  return response.json()
}

export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  if (!API_KEY) {
    throw new Error('TMDb API key is not configured. Please set VITE_TMDB_API_KEY in your .env file')
  }

  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`)
  }

  return response.json()
}

export const fetchMovieCredits = async (movieId: number): Promise<CreditsResponse> => {
  if (!API_KEY) {
    throw new Error('TMDb API key is not configured. Please set VITE_TMDB_API_KEY in your .env file')
  }

  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch movie credits: ${response.statusText}`)
  }

  return response.json()
}

export const searchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
  if (!API_KEY) {
    throw new Error('TMDb API key is not configured. Please set VITE_TMDB_API_KEY in your .env file')
  }

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
  )

  if (!response.ok) {
    throw new Error(`Failed to search movies: ${response.statusText}`)
  }

  return response.json()
}

export const discoverMovies = async (
  page: number = 1,
  options?: {
    year?: string
    minRating?: string
    genreId?: string
    searchQuery?: string
  }
): Promise<MoviesResponse> => {
  if (!API_KEY) {
    throw new Error('TMDb API key is not configured. Please set VITE_TMDB_API_KEY in your .env file')
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    page: page.toString(),
  })

  if (options?.year) {
    params.append('primary_release_year', options.year)
  }

  if (options?.minRating) {
    params.append('vote_average.gte', options.minRating)
  }

  if (options?.genreId) {
    params.append('with_genres', options.genreId)
  }

  if (options?.searchQuery) {
    params.append('with_text_query', options.searchQuery)
  }

  const response = await fetch(`${BASE_URL}/discover/movie?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to discover movies: ${response.statusText}`)
  }

  return response.json()
}
