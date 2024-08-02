type ChildrenProp = {
	children?: React.ReactNode;
};

type ButtonProps = ChildrenProp & {
	type?: "submit" | "button";
	disabled?: boolean;
	onClick?: () => void;
	tabIndex?: number;
	children?: React.ReactNode;
};

type LoadingProps = {
	size?: string;
};

type AlertBoxProps = ChildrenProp & {
	success?: boolean;
};

type LinkProps = ChildrenProp & {
	to: string;
	active?: boolean;
	dark?: boolean;
	small?: boolean;
	outside?: boolean;
	inheritColor?: boolean;
	inline?: boolean;
	limitunderbar?: boolean;
	underbarsize?: string;
	tabIndex?: number;
	wholeline?: boolean;
	onClick?: () => void;
};

type NavLinkProps = ChildrenProp & {
	to: string;
	active: boolean;
	tabIndex: number;
};

type SearchProps = {
	onClose: () => void;
};

type ActiveIndicatorProps = {
	activeLinkRef: React.RefObject<HTMLElement> | undefined;
};

type LayoutProps = {
	path: string;
};

type OpenProps = {
	open?: boolean;
	tabIndex?: number;
	cyId?: string;
};

type DownArrowProps = OpenProps & {
	onClick?: (e: React.BaseSyntheticEvent) => void;
};

type FoldoutProps = ChildrenProp &
	OpenProps & {
		onClick: () => void;
		topbar: ReactElement;
		height?: string;
		heightMultiplierOnPhone?: number;
		heightMultiplierOnTablet?: number;
		heightMultiplierOnLarger?: number;
		cyId?: string;
	};

type LinkGroupProps = OpenProps &
	ChildrenProp & {
		domain: string;
		height?: string;
		links: LinkItem[];
		onClick: () => void;
	};

type HoverImageProps = {
	publicURL: string;
	name: string;
	url?: string;
	color?: string;
	size?: string;
	square?: boolean;
	marginRightOnPhone?: string;
};

type IconGridProps = {
	height?: string;
	icons: FileNode[];
};

type IconProps = {
	height?: string;
	icon: FileNode;
};

type IconButtonProps = {
	iconSrc: string;
	onClick: () => void;
	size?: string;
	disabled?: boolean;
	alt: string;
	name: string;
	tabIndex?: number;
};
