type FilterOption = {
	label: string;
	id: string;
	disabled: boolean;
};
type NewFilterProps = {
	onCreate: (val: string) => void;
	options: FilterOption[];
};

type FilterProps = {
	onCreate: (id: string) => void;
	onRemove: (id: string) => void;
	onModifyDate: (time: "start" | "end", value: Date) => void;
	onModifyKeywords: (id: string, keywords: readonly PotentialChoice[]) => void;
	onModifyWordFilterType: (id: string, type: WordFilterType) => void;
	onModifySearch: (id: string, search: string) => void;
	options: FilterOption[];
	filters: ItemFilter[];
};

type MultipleChoiceInputProps = {
	label: string;
	choices: PotentialChoice[];
	onSelect: (choices: readonly PotentialChoice[]) => void;
};

type TextInputProps = {
	label: string;
	name: string;
	onChange: (val: string) => void;
	value: string;
};

type BorderRadiusCorners = {
	topLeft?: string;
	topRight?: string;
	bottomLeft?: string;
	bottomRight?: string;
};

type FilterPillProps = ChildrenProp & {
	onRemove: () => void;
	onEscape: () => void;
};

type FilterButtonProps = ChildrenProp &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		borderRadiusCorners?: BorderRadiusCorners;
		filledIn?: boolean;
		width?: string;
	};

type DateFilterProps = DateFilter & {
	onModify: (time: "start" | "end", value: Date) => void;
	onRemove: () => void;
};

type KeywordFilterProps = KeywordFilter & {
	onModify: (keywords: readonly PotentialChoice[]) => void;
	onChangeType: (type: WordFilterType) => void;
	onRemove: () => void;
};

type SearchFilterProps = SearchFilter & {
	onSearch: (search: string) => void;
	onChangeType: (type: WordFilterType) => void;
	onRemove: () => void;
};

type ItemFilter = DateFilter | KeywordFilter | SearchFilter;

type DateFilter = {
	id: "date";
	label: string;
	start: Date;
	end: Date;
};

type KeywordFilter = {
	id: string;
	label: string;
	type: WordFilterType;
	currentKeywords: readonly PotentialChoice[];
	allKeywords: PotentialChoice[];
};

type WordFilterType = "any" | "all";
type SearchFilter = {
	id: string;
	label: string;
	type: WordFilterType;
	search: string;
};
