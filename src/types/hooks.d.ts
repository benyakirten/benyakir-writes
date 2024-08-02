import type { FetchState } from "@/hooks";

type AlternationHook = () => [string, (val: string) => void];

type LookupHook = (items: BooleanLookup) => [
	BooleanLookup,
	React.Dispatch<{
		type: LookupActionType;
		payload: keyof BooleanLookup;
	}>,
];

type DebounceHook = (
	callback: (val: string) => void,
	initialValue?: string,
	timeout?: number,
) => [string, (val: string) => void];

type PaginationHook = <T>(initialItems: T[]) => {
	currentPage: number;
	onPageChange: React.Dispatch<React.SetStateAction<number>>;
	items: T[];
	setCurrentItems: (_items: T[]) => void;
};

type ToggleHook = (initialVal?: boolean) => [boolean, () => void];

type ValidateStringFunction<T> = (args: T) => (input: string) => boolean;
type ValidateNumberFunction<T> = (args: T) => (input: number) => boolean;
type ValidationFunction = ValidateNumberFunction | ValidateStringFunction;

type ValidationHook = (
	valFns: ValidationFunction[],
	initialValue?: string | number,
	initialValidity?: boolean,
) => [string | number, (newVal: string | number) => void, boolean];

type MultipleHook = (
	allOptions: string[],
	currentlyOpen?: string[],
) => [BooleanLookup, (...options: string[]) => void];
type SetHook = <T = string>(items?: T[]) => [Set<T>, (item: T) => void];

type LatestUpdateState = FetchState | Date;
type LatestRepoUpdateHook = (repoLink?: string) => LatestUpdateState;

type MultiSelectHookFilterFunction = <T extends object>(
	choices: Set<string>,
	items: T[],
	getter: (item: T) => string[] | null,
) => T[];
type MultiSelectHook = (
	defaultValue?: string[],
) => [Set<string>, MultiSelectHookFilterFunction];

type EventListenerHook<K extends keyof WindowEventMap> = (
	event: K,
	handler: WindowEventMap[K],
	options?: AddEventListenerOptions & {
		element?: HTMLElement | Window;
	},
) => void;
