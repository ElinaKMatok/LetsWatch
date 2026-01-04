import { create } from 'zustand'
import { fetchGenres, searchMovies, discoverMovies } from '../api/movies'
import type { Movie, Genre } from './types'

interface MoviesState {
  // Data
  movies: Movie[]
  genres: Genre[]
  
  // Filters
  searchQuery: string
  minYear: number | null
  maxYear: number | null
  minRating: number | null
  maxRating: number | null
  genreFilter: string
  
  // Pagination
  currentPage: number
  totalPages: number
  
  // UI State
  loading: boolean
  error: string | null
  selectedMovieId: number | null
  isDrawerOpen: boolean
  
  // Genres loaded flag (to prevent duplicate fetches)
  genresLoaded: boolean
  
  // Actions
  setSearchQuery: (query: string) => void
  setYearRange: (min: number | null, max: number | null) => void
  setRatingRange: (min: number | null, max: number | null) => void
  setGenreFilter: (genre: string) => void
  setCurrentPage: (page: number) => void
  clearFilters: () => void
  clearSearch: () => void
  openDrawer: (movieId: number) => void
  closeDrawer: () => void
  
  // Async actions
  loadGenres: () => Promise<void>
  loadMovies: () => Promise<void>
}

export const useMoviesStore = create<MoviesState>((set, get) => ({
  // Initial state
  movies: [],
  genres: [],
  searchQuery: '',
  minYear: null,
  maxYear: null,
  minRating: 1,
  maxRating: 10,
  genreFilter: '',
  currentPage: 1,
  totalPages: 1,
  loading: true,
  error: null,
  selectedMovieId: null,
  isDrawerOpen: false,
  genresLoaded: false,
  
  // Synchronous actions
  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
    // Clear filters when search is used
    if (query.trim()) {
      set({ minYear: null, maxYear: null, minRating: 1, maxRating: 10, genreFilter: '' })
    }
  },
  
  setYearRange: (min: number | null, max: number | null) => {
    set({ minYear: min, maxYear: max })
    // Clear search when filter is used
    if (min !== null || max !== null) {
      set({ searchQuery: '' })
    }
  },
  
  setRatingRange: (min: number | null, max: number | null) => {
    set({ minRating: min, maxRating: max })
    // Clear search when filter is used
    if (min !== null || max !== null) {
      set({ searchQuery: '' })
    }
  },
  
  setGenreFilter: (genre: string) => {
    set({ genreFilter: genre })
    // Clear search when filter is used
    if (genre) {
      set({ searchQuery: '' })
    }
  },
  
  setCurrentPage: (page: number) => {
    set({ currentPage: page })
  },
  
  clearFilters: () => {
    set({ minYear: null, maxYear: null, minRating: 1, maxRating: 10, genreFilter: '' })
  },
  
  clearSearch: () => {
    set({ searchQuery: '' })
  },
  
  openDrawer: (movieId: number) => {
    set({ selectedMovieId: movieId, isDrawerOpen: true })
  },
  
  closeDrawer: () => {
    set({ selectedMovieId: null, isDrawerOpen: false })
  },
  
  // Async actions
  loadGenres: async () => {
    const { genresLoaded } = get()
    if (genresLoaded) return // Prevent duplicate fetches
    
    try {
      set({ genresLoaded: true })
      const genresData = await fetchGenres()
      set({ genres: genresData.genres })
    } catch (err) {
      console.error('Failed to load genres:', err)
      set({ genresLoaded: false }) // Reset on error so it can retry
    }
  },
  
  loadMovies: async () => {
    const { searchQuery, minYear, maxYear, minRating, maxRating, genreFilter, currentPage } = get()
    
    try {
      set({ loading: true, error: null })
      
      const hasSearch = searchQuery.trim()
      
      let moviesData: Awaited<ReturnType<typeof discoverMovies>>
      
      if (hasSearch) {
        // Use search API when search query is active (filters are cleared)
        moviesData = await searchMovies(searchQuery.trim(), currentPage)
      } else {
        // Use discover API for all cases (with or without filters)
        // When no filters, discover API returns popular movies by default
        // Only pass rating filter if it's not the default range (1-10)
        const shouldFilterRating = minRating !== 1 || maxRating !== 10
        
        moviesData = await discoverMovies(currentPage, {
          minYear: minYear || undefined,
          maxYear: maxYear || undefined,
          minRating: shouldFilterRating ? minRating?.toString() : undefined,
          maxRating: shouldFilterRating ? maxRating?.toString() : undefined,
          genreId: genreFilter || undefined,
        })
      }
      
      set({
        movies: moviesData.results,
        totalPages: moviesData.total_pages,
        loading: false,
      })
      
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to load movies',
        loading: false,
      })
    }
  },
}))
