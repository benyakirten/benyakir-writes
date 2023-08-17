import { useState } from 'react'

const useAlternation: AlternationHook = () => {
  const [dropdownOpen, setAlternationOpen] = useState<string>('')
  const setAlternation = (val: string) => {
    dropdownOpen === val ? setAlternationOpen('') : setAlternationOpen(val)
  }
  return [dropdownOpen, setAlternation]
}

export default useAlternation
