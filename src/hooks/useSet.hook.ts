import * as React from 'react'

import { SetHook } from '@Types/hooks'

const useSet: SetHook = <T = string>(allItems: T[] = []) => {
  const [set, _setSet] = React.useState(new Set(allItems))
  const setSet = (...items: T[]) =>
    _setSet((itemSet) => {
      items.forEach((item) =>
        itemSet.has(item) ? itemSet.delete(item) : itemSet.add(item)
      )
      return new Set(itemSet)
    })

  return [set, setSet]
}

export default useSet
