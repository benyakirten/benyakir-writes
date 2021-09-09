import { useReducer } from 'react'

const useLookup: LookupHook = (items: BooleanLookup) => {
    function reducer(state: BooleanLookup = items, action: { type: LookupActionType, payload: keyof BooleanLookup }) {
        switch (action.type) {
            case 'ACTIVATE':
                return {
                    ...state,
                    [action.payload]: true
                }
            case 'DEACTIVATE':
                return {
                    ...state,
                    [action.payload]: false
                }
            case 'TOGGLE':
                return {
                    ...state,
                    [action.payload]: !state[action.payload]
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, items)
    return [state, dispatch]
}

export default useLookup