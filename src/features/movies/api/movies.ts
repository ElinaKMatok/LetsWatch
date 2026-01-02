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
