import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

type SliderProps = {
  label: string
  min: number
  max: number
  value: number | [number, number] | null
  onChange: (value: number | [number, number] | null) => void
  range?: boolean
  showMaxValue?: boolean
  formatValue?: (value: number | [number, number] | null) => string
  className?: string
}

export const RangeSlider = ({
  label,
  min,
  max,
  value,
  onChange,
  range = false,
  showMaxValue = true,
  formatValue,
  className = '',
}: SliderProps) => {
  const displayValue = formatValue
    ? formatValue(value)
    : range && Array.isArray(value)
    ? `${value[0]} - ${value[1]}`
    : typeof value === 'number'
    ? value.toString()
    : 'All'

  const handleChange = (newValue: number | number[]) => {
    if (range) {
      if (Array.isArray(newValue) && newValue.length === 2) {
        let [minVal, maxVal] = newValue

        // Ensure min is not greater than max
        if (minVal > maxVal) {
          ;[minVal, maxVal] = [maxVal, minVal]
        }

        // Clamp values to valid range
        minVal = Math.max(minVal, min)
        maxVal = Math.min(maxVal, max)

        // If both values are at the edges, clear the filter
        if (minVal === min && maxVal === max) {
          onChange(null)
        } else {
          onChange([minVal, maxVal])
        }
      }
    } else {
      if (typeof newValue === 'number') {
        const clampedValue = Math.max(min, Math.min(max, newValue))
        // If value is at minimum, pass null to indicate "All"
        if (clampedValue === min) {
          onChange(null)
        } else {
          onChange(clampedValue)
        }
      }
    }
  }

  const sliderValue = range
    ? Array.isArray(value)
      ? value
      : [min, max]
    : typeof value === 'number'
    ? value
    : min

  return (
    <div className={`flex flex-col gap-2 min-w-[300px] ${className}`}>
      <div className="flex items-center">
        <label className="text-sm text-gray-600 whitespace-nowrap">
          {label}: {displayValue}
        </label>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 min-w-[40px] tabular-nums">
          {range && Array.isArray(value)
            ? value[0]
            : typeof value === 'number'
            ? value
            : min}
        </span>
        <div className="flex-1 ml-[5px]">
          <Slider
            range={range}
            min={min}
            max={max}
            value={sliderValue}
            onChange={handleChange}
            trackStyle={
              range
                ? [{ backgroundColor: '#3b82f6', height: 4 }]
                : { backgroundColor: '#3b82f6', height: 4 }
            }
            handleStyle={
              range
                ? [
                    {
                      borderColor: '#3b82f6',
                      height: 18,
                      width: 18,
                      marginLeft: -9,
                      marginTop: -7,
                      backgroundColor: '#fff',
                    },
                    {
                      borderColor: '#3b82f6',
                      height: 18,
                      width: 18,
                      marginLeft: -9,
                      marginTop: -7,
                      backgroundColor: '#fff',
                    },
                  ]
                : {
                    borderColor: '#3b82f6',
                    height: 18,
                    width: 18,
                    marginLeft: -9,
                    marginTop: -7,
                    backgroundColor: '#fff',
                  }
            }
            railStyle={{ backgroundColor: '#e5e7eb', height: 4 }}
          />
        </div>
        {showMaxValue && (
          <span className="text-xs text-gray-500 min-w-[30px] text-right tabular-nums">
            {range && Array.isArray(value)
              ? value[1]
              : typeof value === 'number'
              ? value
              : max}
          </span>
        )}
      </div>
    </div>
  )
}
