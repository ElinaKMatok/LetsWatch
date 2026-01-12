import { RadioButton } from './RadioButton'

type RadioOption = {
  value: string
  label: string
}

type RadioButtonsGroupProps = {
  name: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export const RadioButtonsGroup = ({
  name,
  options,
  value,
  onChange,
  className = '',
}: RadioButtonsGroupProps) => {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
          label={option.label}
        />
      ))}
    </div>
  )
}

