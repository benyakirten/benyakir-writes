import { useState, useEffect } from 'react'

import { SEARCH_TIMEOUT } from '@Constants'

const useDebounce: DebounceHook = (callback: (t: string) => void, initialVal: string = '', timeLimit: number = SEARCH_TIMEOUT) => {
    const [timer, setTimer] = useState<NodeJS.Timeout>()
    const [text, setText] = useState(initialVal)

    useEffect(() => {
        if (!text) {
            callback('')
        }
        if (timer) {
            clearTimeout(timer)
            setTimer(undefined)
        }
        const timeout = setTimeout(() => callback(text), timeLimit)
        setTimer(timeout)
    }, [text])

    return [text, setText]
}

export default useDebounce