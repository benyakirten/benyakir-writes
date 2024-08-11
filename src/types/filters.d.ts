type NewFilterProps = {
	onCreate: (string) => void;
	options: string[];
};

type FilterProps = {
	onCreate: (id: string) => void;
	onRemove: (id: string) => void;
	onModifyDate: (time: "before" | "after", value: Date) => void;
	onModifyKeywords: (id: string, keywords: string[]) => void;
	options: string[];
	filters: ItemFilter[];
};

type BorderRadiusCorners = {
	topLeft?: string;
	topRight?: string;
	bottomLeft?: string;
	bottomRight?: string;
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
	onModify: (id: string, keywords: string[]) => void;
	onRemove: () => void;
};

type SearchFilterProps = SearchFilter & {
	onSearch: (id: string, search: string) => void;
	onChangeType: (id: string, type: SearchType) => void;
	onRemove: () => void;
};

type ItemFilter = DateFilter | KeywordFilter;

type DateFilter = {
	label: string;
	before: Date;
	after: Date;
};

type KeywordFilter = {
	label: string;
	currentKeywords: string[];
	allKeywords: string[];
};

type SearchType = "any" | "all";
type SearchFilter = {
	id: string;
	type: SearchType;
	search: string;
};
