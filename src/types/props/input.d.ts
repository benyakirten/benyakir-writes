interface InputProps {
  label: string
  name: string
  tabIndex?: number
}

type FilterProps = ChildrenProp & {
  name: string
  onSearch: (val: string) => void
}

interface TextProps extends InputProps {
  value: string
  onChange: (newText: string) => void
  width?: string
  autofocus?: boolean
  cyId?: string
}

interface CheckboxProps extends InputProps {
  value: boolean
  onToggle: (newState: boolean) => void
}

interface DateProps extends InputProps {
  value: Date
  onChange: (date: Date) => void
}

interface ChoiceProps {
  tabIndex?: number
  label: string
  value: boolean
  onSelect: (label: string) => void
}

interface MultipleChoiceProps {
  tabIndex?: number
  choices: PotentialChoice[]
  onSelect: (choices: PotentialChoice[]) => void
}

interface ToggleProps extends InputProps {
  value: boolean
  onToggle: () => void
  dataCy?: string
}

interface ColorPickerProps extends InputProps {
  value: string
  onChange: (newVal: string) => void
}
