import { useState } from 'react'

const useDropdown: DropdownHook = () => {
    const [dropdownOpen, setDropdownOpen] = useState<string>('')
    const setDropdown = (val: string) => {
        dropdownOpen === val
            ? setDropdownOpen('')
            : setDropdownOpen(val)

    }
    return [dropdownOpen, setDropdown]
}

export default useDropdown