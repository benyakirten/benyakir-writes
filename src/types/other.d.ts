declare module '*.png';
declare module '*.svg';
declare module '*.json';

type DropdownHook = () => [string, (val: string) => void]
type LookupHook = (items: BooleanLookup) => [BooleanLookup, React.Dispatch<{
    type: LookupActionType;
    payload: keyof BooleanLookup;
}>]

type LookupActionType = 'TOGGLE' | 'ACTIVATE' | 'DEACTIVATE'