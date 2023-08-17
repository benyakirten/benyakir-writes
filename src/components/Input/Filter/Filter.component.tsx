import * as React from 'react'

import { FilterContainer } from './Filter.styles'
import { Subtitle } from '@Styles/general-components'
import { Text } from '@Input'

import { useDebounce } from '@Hooks'

const Filter: React.FC<FilterProps> = ({ name, onSearch, children }) => {
  const [search, setSearch] = useDebounce(onSearch)

  return (
    <FilterContainer>
      <Subtitle>Filter{' ' + name}</Subtitle>
      <Text
        value={search}
        onChange={setSearch}
        label="Search"
        name={`${name}-filter-search`}
        autofocus
      />
      {children}
    </FilterContainer>
  )
}

export default Filter
