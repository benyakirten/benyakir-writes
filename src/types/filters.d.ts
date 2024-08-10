type NewFilterProps = {
	onCreate: (string) => void;
	options: string[];
};

type FilterProps = {
	onCreate: (id: string) => void;
	onRemove: (id: string) => void;
	onModify:
		| ((id: string, keywords: string[]) => void)
		| ((time: "before" | "after", value: Date) => void);
	options: string[];
	filters: ItemFilter[];
};

type DateFilterProps = {
	onModify: (time: "before" | "after", value: Date) => void;
	before: Date;
	after: Date;
};

type ItemFilter = DateFilter | KeywordFilter;

type DateFilter = {
	id: "Date";
	before: Date;
	after: Date;
};

type KeywordFilter = {
	id: string;
	currentKeywords: string[];
	allKeywords: string[];
};
