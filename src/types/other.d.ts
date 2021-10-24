declare module '*.png';
declare module '*.svg';
declare module '*.json';
declare module '*.ttf';
declare module '*.js';
declare module '*.css' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

type DropdownHook = () => [string, (val: string) => void]
type LookupHook = (items: BooleanLookup) => [BooleanLookup, React.Dispatch<{
    type: LookupActionType;
    payload: keyof BooleanLookup;
}>]
type DebounceHook = (callback: (val: string) => void, initialValue?: string, timeout?: number) => [string, (val: string) => void]
type PaginationHook =  <T>(initialItems: T[]) => {
    currentPage: number;
    onPageChange: React.Dispatch<React.SetStateAction<number>>;
    items: T[];
    setCurrentItems: (_items: T[]) => void;
}

type LookupActionType = 'TOGGLE' | 'ACTIVATE' | 'DEACTIVATE'