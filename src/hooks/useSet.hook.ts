import * as React from "react"

const useSet = <T>(allItems: T[] = []) => {
  const [set, _setSet] = React.useState(new Set(allItems))
  const setSet = (...items: T[]) => _setSet(itemSet => {
    items.forEach(item => itemSet.has(item) ? itemSet.delete(item) : itemSet.add(item))
    return itemSet
  })

  return [set, setSet]
}

export default useSet