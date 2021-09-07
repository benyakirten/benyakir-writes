import { useState } from 'react'

const useLookup: LookupHook = (items: BooleanLookup) => {
    const [lookup, setLookup] = useState<BooleanLookup>(items);
    const toggleVal = (val: keyof BooleanLookup) => setLookup(prev => ({ ...prev, [val]: !prev[val] }))
    return [lookup, toggleVal]
}

export default useLookup