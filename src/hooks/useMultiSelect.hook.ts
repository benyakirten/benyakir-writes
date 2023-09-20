import { MultiSelectHook } from '@/types/hooks'
import * as React from 'react'

const useMultiSelect: MultiSelectHook = (defaultValue?: string[]) => {
  const [set, _setSet] = React.useState(new Set<string>(defaultValue))
  const setSet = (items: PotentialChoice[]) =>
    _setSet(new Set(items.map((item) => item.value)))

  const filterItems = <T>(items: T[], getter: (item: T) => string[] | null) => {
    console.log(set.size)
    console.log('HERE')
    if (set.size === 0) {
      return items
    }
    return items.filter((item) => {
      const value = getter(item)
      if (!value) {
        return false
      }

      const valueSet = new Set(value as string[])
      for (const setItem of set) {
        if (!valueSet.has(setItem)) {
          return false
        }
      }

      return true
    })
  }

  return [set, setSet, filterItems]
}

export default useMultiSelect
