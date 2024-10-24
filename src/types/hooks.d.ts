import type { FetchState } from "@/hooks";
import {
	CreateFilterOption,
	DateFilter,
	ItemFilter,
	KeywordFilter,
	KeywordFilterDetails,
	SearchFilter,
} from "@/types/filters";

type AlternationHook = (
	id: string,
	defaultValue?: string,
) => [string | null, (val: string | null) => void];

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

type PaginationHook = <T>(
	initialItems: T[],
	defaultItemsPerPage?: number,
) => {
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	items: T[];
	setItems: (_items: T[]) => void;
	itemsPerPage: number;
	setItemsPerPage: (_itemsPerPage: number) => void;
	numPages: number;
	visibleItems: T[];
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

type FlyoutHook = (
	menuRef: React.RefObject<HTMLElement>,
	initialState?: boolean,
) => [
	boolean,
	boolean,
	React.Dispatch<React.SetStateAction<boolean>>,
	React.Dispatch<React.SetStateAction<boolean>>,
];

type FilterHook = <T extends object>(
	items: T[],
	startDate: Date,
	endDate: Date,
	keywordFilterDetails: KeywordFilterDetails[],
	createFilterOptions: CreateFilterOption[],
	filterByDate: (filter: DateFilter, items: T[]) => T[],
	filterByKeywords: (filter: KeywordFilter, items: T[]) => T[],
	filterBySearch: (filter: SearchFilter, items: T[]) => T[],
) => {
	pagination: ReturnType<PaginationHook<T>>;
	createFilter: (id: string) => void;
	removeFilter: (id: string) => void;
	modifyDate: (time: "start" | "end", value: Date) => void;
	modifyKeywords: (id: string, keywords: readonly PotentialChoice[]) => void;
	modifyFilterType: (id: string, type: WordFilterType) => void;
	modifySearch: (id: string, search: string) => void;
	filters: ItemFilter[];
};
