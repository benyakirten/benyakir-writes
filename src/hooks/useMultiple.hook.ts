import { useState, useMemo } from 'react'

const useMultiple: MultipleHook = (allOptions, currentlyOpen) => {
  currentlyOpen = currentlyOpen ?? allOptions
  const open: BooleanLookup = useMemo(
    () => allOptions.reduce((acc, next) => ({ [next]: currentlyOpen!.includes(next), ...acc }), {}),
    [allOptions]
  )
  const [openOptions, _setOpenOptions] = useState(open)
  const setOpenOptions = (...options: string[]) => {
    _setOpenOptions(current => {
      const state = { ...current }
      options.forEach(option => {
        if (option in state) {
          state[option] = !state[option]
        }
      })
      return state
    })
  }
  return [openOptions, setOpenOptions]
}

export default useMultiple