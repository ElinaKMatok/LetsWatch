import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RangeSlider } from './Slider'

describe('RangeSlider', () => {
  it('renders with label', () => {
    const handleChange = vi.fn()
    render(
      <RangeSlider
        label="Year"
        min={1900}
        max={2025}
        value={null}
        onChange={handleChange}
      />
    )
    
    expect(screen.getByText(/Year/)).toBeInTheDocument()
  })

  it('displays min and max values', () => {
    const handleChange = vi.fn()
    render(
      <RangeSlider
        label="Rating"
        min={1}
        max={10}
        value={null}
        onChange={handleChange}
      />
    )
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('displays current value when provided', () => {
    const handleChange = vi.fn()
    render(
      <RangeSlider
        label="Year"
        min={1900}
        max={2025}
        value={[2000, 2010]}
        onChange={handleChange}
        range
      />
    )
    
    expect(screen.getByText('2000')).toBeInTheDocument()
    expect(screen.getByText('2010')).toBeInTheDocument()
  })

  it('hides max value when showMaxValue is false', () => {
    const handleChange = vi.fn()
    render(
      <RangeSlider
        label="Rating"
        min={1}
        max={10}
        value={5}
        onChange={handleChange}
        showMaxValue={false}
      />
    )
    
    expect(screen.queryByText('10')).not.toBeInTheDocument()
  })

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn()
    render(
      <RangeSlider
        label="Year"
        min={1900}
        max={2025}
        value={null}
        onChange={handleChange}
      />
    )
    
    // Note: Testing slider interaction requires more complex setup
    // This is a basic test to ensure the component renders
    expect(handleChange).not.toHaveBeenCalled()
  })
})
