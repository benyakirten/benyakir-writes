type ButtonProps = {
  type?: 'submit' | 'button';
  disabled?: boolean;
  onClick?: () => void;
  tabIndex?: number;
}

type LoadingProps = {
  size?: string;
}

type AlertBoxProps = {
  success?: boolean;
}

type LinkProps = {
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
  wholeline?: boolean
}
type LayoutProps = {
  path: string;
}

type OpenProps = {
  open?: boolean;
  tabIndex?: number;
  cyId?: string;
}

type DownArrowProps = OpenProps & {
  onClick?: (e: React.BaseSyntheticEvent) => void;
}

type FoldoutProps = OpenProps & {
  onClick: () => void;
  topbar: ReactElement;
  height?: string;
  heightMultiplierOnPhone?: number;
  heightMultiplierOnTablet?: number;
  heightMultiplierOnLarger?: number;
  cyId?: string;
}

type LinkGroupProps = OpenProps & {
  domain: string;
  height?: string;
  links: LinkItem[];
  onClick: () => void;
}

type HoverImageProps = {
  publicURL: string;
  name: string;
  url?: string;
  color?: string;
  size?: string;
  square?: boolean;
  marginRightOnPhone?: string;
}

type IconGridProps = {
  height?: string;
  icons: FileNode[];
}

type IconProps = {
  height?: string;
  icon: FileNode;
}

type IconButtonProps = {
  iconSrc: string;
  onClick: () => void;
  size?: string;
  disabled?: boolean;
  alt: string;
  name: string;
  tabIndex?: number;
}