import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PaginationPanel } from './PaginationPanel'

describe('PaginationPanel', () => {
  it('renders current page and page numbers', () => {
    const handlePageChange = vi.fn()
    render(
      <PaginationPanel
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    )
    
    expect(screen.getByText('1')).toBeInTheDocument()
    // Should show page numbers (1-5 when on first page)
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('disables previous button on first page', () => {
    const handlePageChange = vi.fn()
    render(
      <PaginationPanel
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    )
    
    const prevButton = screen.getByText('<')
    expect(prevButton).toBeDisabled()
  })

  it('disables next button on last page', () => {
    const handlePageChange = vi.fn()
    render(
      <PaginationPanel
        currentPage={10}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    )
    
    const nextButton = screen.getByText('>')
    expect(nextButton).toBeDisabled()
  })

  it('calls onPageChange when next button is clicked', async () => {
    const user = userEvent.setup()
    const handlePageChange = vi.fn()
    render(
      <PaginationPanel
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    )
    
    const nextButton = screen.getByText('>')
    await user.click(nextButton)
    
    expect(handlePageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange when previous button is clicked', async () => {
    const user = userEvent.setup()
    const handlePageChange = vi.fn()
    render(
      <PaginationPanel
        currentPage={2}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    )
    
    const prevButton = screen.getByText('<')
    await user.click(prevButton)
    
    expect(handlePageChange).toHaveBeenCalledWith(1)
  })

  it('displays page numbers correctly', () => {
    const handlePageChange = vi.fn()
    render(
      <PaginationPanel
        currentPage={5}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    )
    
    // Should show pages around current page (3, 4, 5, 6, 7)
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})
