type ButtonProps = {
  type?: 'submit' | 'button';
  disabled?: boolean;
  onClick?: () => void;
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
  limitUnderbar?: boolean;
  underbarSize?: string;
  tabIndex?: number;
}
type LayoutProps = {
  path: string;
}

type OpenProps = {
  open?: boolean;
  tabIndex?: number;
  onClick?: () => void;
  cyId?: string;
}

type FoldoutProps = OpenProps & {
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