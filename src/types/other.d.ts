declare module '*.png';
declare module '*.svg';

type DropdownHook = () => [string, (val: string) => void]
type LookupHook = (items: BooleanLookup) => [BooleanLookup, (val: keyof BooleanLookup) => void]