import type { Element } from "react";

type LogoProps = {
	opening: boolean;
	open: boolean;
};

type LogoQuery = {
	file: {
		name: string;
		publicURL: string;
	};
};

type SearchProps = {
	open: boolean;
	onClick: () => void;
};

type PaginatableItem = { slug?: string; title: string };

// TODO: Figure out how to type this with generic components
type PaginateProps<T extends PaginatableItem> = {
	currentPage: number;
	items: T[];
	El: Element | ((item: T) => Element);
	onPageChange: (n: number) => void;
};

type PaginateMenuProps = {
	limit: number;
	setLimit: (n: number) => void;
	currentPage: number;
	maxPages: number;
	onLeft: () => void;
	onRight: () => void;
	disableRight?: boolean;
	name: string;
};
