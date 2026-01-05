import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MovieCard } from './MovieCard'
import type { Movie, Genre } from '../model/types'

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview',
  release_date: '2023-01-01',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100,
  genre_ids: [1, 2],
}

const mockGenres: Genre[] = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
]

describe('MovieCard', () => {
  it('renders movie title', () => {
    render(<MovieCard movie={mockMovie} genres={mockGenres} />)
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('renders movie overview', () => {
    render(<MovieCard movie={mockMovie} genres={mockGenres} />)
    
    expect(screen.getByText('This is a test movie overview')).toBeInTheDocument()
  })

  it('renders movie year', () => {
    render(<MovieCard movie={mockMovie} genres={mockGenres} />)
    
    expect(screen.getByText('2023')).toBeInTheDocument()
  })

  it('renders movie rating', () => {
    render(<MovieCard movie={mockMovie} genres={mockGenres} />)
    
    expect(screen.getByText('8.5')).toBeInTheDocument()
  })

  it('renders genre tags', () => {
    render(<MovieCard movie={mockMovie} genres={mockGenres} />)
    
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Comedy')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<MovieCard movie={mockMovie} genres={mockGenres} onClick={handleClick} />)
    
    const card = screen.getByText('Test Movie').closest('div')
    if (card) {
      await user.click(card)
      expect(handleClick).toHaveBeenCalledTimes(1)
    }
  })

  it('displays poster image when available', () => {
    render(<MovieCard movie={mockMovie} genres={mockGenres} />)
    
    const image = screen.getByAltText('Test Movie')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', expect.stringContaining('test-poster.jpg'))
  })

  it('displays placeholder when poster is missing', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null }
    render(<MovieCard movie={movieWithoutPoster} genres={mockGenres} />)
    
    expect(screen.getByText('No Image')).toBeInTheDocument()
  })
})
