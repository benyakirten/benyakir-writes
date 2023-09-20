import * as React from 'react'

import { FONT_MD } from '@StyleVars'

import Select from 'react-select'

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  choices,
  onSelect,
  tabIndex = 0,
}) => {
  return (
    <Select
      isMulti
      options={choices}
      menuIsOpen={true}
      tabIndex={tabIndex}
      onChange={(val) => onSelect(val as PotentialChoice[])}
      styles={{
        menuList: (base) => ({
          ...base,
          height: '14rem',
        }),
        option: (base) => ({
          ...base,
          color: '#000',
          fontSize: FONT_MD,
          textTransform: 'capitalize',
        }),
        multiValue: (base) => ({
          ...base,
          padding: '0.4rem',
          backgroundColor: '#ccc',
          display: 'flex',
          alignItems: 'center',
          fontSize: FONT_MD,
        }),
        multiValueRemove: (base) => ({
          ...base,
          padding: '0.2rem',
          ':hover': {
            backgroundColor: '#444',
            transition: 'background-color 200ms ease',
          },
        }),
      }}
    />
  )
}

export default MultipleChoice
