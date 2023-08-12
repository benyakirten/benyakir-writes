import { useCallback, useEffect, useState } from 'react';

import { DebounceHook } from '@/types/hooks';
import { SEARCH_TIMEOUT } from '@Constants';

const useDebounce: DebounceHook = (callback: (t: string) => void, initialVal: string = '', timeLimit: number = SEARCH_TIMEOUT) => {
    const memoizedCallback = useCallback(text => callback(text), [callback]);
    const [timer, setTimer] = useState<NodeJS.Timeout>()
    const [text, setText] = useState(initialVal)

    useEffect(() => {
        if (!text) {
            memoizedCallback('')
        }
        if (timer) {
            clearTimeout(timer)
            setTimer(undefined)
        }
        const timeout = setTimeout(() => memoizedCallback(text), timeLimit)
        setTimer(timeout)
    }, [text])

    return [text, setText]
}

export default useDebounce