import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders title and message', () => {
    render(<EmptyState title="No movies found" message="Try adjusting your filters" />)
    
    expect(screen.getByText('No movies found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument()
  })

  it('renders default icon', () => {
    render(<EmptyState title="Empty" message="No items" />)
    
    // Check if SVG icon is present (movie reel icon)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<EmptyState title="Error" message="Something went wrong" />)
    
    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
})
