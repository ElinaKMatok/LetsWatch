import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ClearButton } from './ClearButton'

describe('ClearButton', () => {
  it('renders the clear button', () => {
    const handleClick = vi.fn()
    render(<ClearButton onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<ClearButton onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('displays custom aria-label', () => {
    const handleClick = vi.fn()
    render(<ClearButton onClick={handleClick} ariaLabel="Clear search" />)
    
    const button = screen.getByLabelText('Clear search')
    expect(button).toBeInTheDocument()
  })

  it('displays custom title', () => {
    const handleClick = vi.fn()
    render(<ClearButton onClick={handleClick} title="Clear all filters" />)
    
    const button = screen.getByTitle('Clear all filters')
    expect(button).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const handleClick = vi.fn()
    const { container } = render(
      <ClearButton onClick={handleClick} className="custom-class" />
    )
    
    const button = container.querySelector('button')
    expect(button).toHaveClass('custom-class')
  })
})
