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

type DateFilterProps = DateFilter & {
	onModify: (time: "before" | "after", value: Date) => void;
	onRemove: () => void;
};

type KeywordFilterProps = KeywordFilter & {
	onModify: (id: string, keywords: string[]) => void;
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
