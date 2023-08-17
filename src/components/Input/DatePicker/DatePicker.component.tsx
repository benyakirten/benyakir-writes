import * as React from 'react'

import { DateContainer, DateInput } from './DatePicker.styles'

const DatePicker: React.FC<DateProps> = ({
  name,
  label,
  onChange,
  value,
  tabIndex = 0,
}) => {
  // I have no idea why getMonth() outputs months as 0-11 when date pickers use 1-12.
  const month = (value.getMonth() + 1).toString()
  const date = value.getDate().toString()
  const convertedDate = `${value.getFullYear()}-${month.padStart(
    2,
    '0'
  )}-${date.padStart(2, '0')}`
  const handleChange = (e: React.BaseSyntheticEvent) => {
    const _raw: string = e.target.value
    const _month = _raw.slice(5, 7)
    const _day = _raw.slice(8, 10)
    const _year = _raw.slice(0, 4)
    const _date = new Date(`${_month}/${_day}/${_year}`)
    onChange(new Date(_date))
  }
  return (
    <DateContainer>
      <label htmlFor={name}>{label}</label>
      <DateInput
        tabIndex={tabIndex}
        type="date"
        onChange={handleChange}
        name={name}
        id={name}
        value={convertedDate}
      />
    </DateContainer>
  )
}

export default DatePicker
