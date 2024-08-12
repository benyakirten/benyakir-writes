type NewFilterProps = {
	onCreate: (string) => void;
	options: string[];
};

type FilterProps = {
	onCreate: (id: string) => void;
	onRemove: (id: string) => void;
	onModifyDate: (time: "before" | "after", value: Date) => void;
	onModifyKeywords: (id: string, keywords: PotentialChoice[]) => void;
	onModifyWordFilterType: (id: string, type: WordFilterType) => void;
	onModifySearch: (id: string, search: string) => void;
	options: string[];
	filters: ItemFilter[];
};

type MultipleChoiceInputProps = {
	choices: PotentialChoice[];
	onSelect: (choices: PotentialChoice[]) => void;
};

type BorderRadiusCorners = {
	topLeft?: string;
	topRight?: string;
	bottomLeft?: string;
	bottomRight?: string;
};

type FilterPillProps = ChildrenProp & {
	onRemove: () => void;
	ref: React.RefObject<HTMLDivElement>;
};

type FilterButtonProps = ChildrenProp &
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		borderRadiusCorners?: BorderRadiusCorners;
		filledIn?: boolean;
	};

type DateFilterProps = DateFilter & {
	onModify: (time: "before" | "after", value: Date) => void;
	onRemove: () => void;
};

type KeywordFilterProps = KeywordFilter & {
	onModify: (keywords: PotentialChoice[]) => void;
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
	before: Date;
	after: Date;
};

type KeywordFilter = {
	id: string;
	label: string;
	type: WordFilterType;
	currentKeywords: PotentialChoice[];
	allKeywords: PotentialChoice[];
};

type WordFilterType = "any" | "all";
type SearchFilter = {
	id: string;
	label: string;
	type: WordFilterType;
	search: string;
};
