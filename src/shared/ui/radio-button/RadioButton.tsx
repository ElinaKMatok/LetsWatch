type RadioButtonProps = {
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  label: string
  className?: string
}

export const RadioButton = ({
  name,
  value,
  checked,
  onChange,
  label,
  className = '',
}: RadioButtonProps) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="w-4 h-4 text-blue-600 focus:outline-none"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  )
}

