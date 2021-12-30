type LogoProps = {
  opening: boolean;
  open: boolean;
}

type LogoQuery = {
  file: {
    name: string;
    publicURL: string;
  }
}

type SearchProps = {
  open: boolean;
  onClick: () => void;
}

type PaginateProps = {
  currentPage: number;
  items: any[];
  El: React.Element;
  onPageChange: (n: number) => void;
}

type PaginateMenuProps = {
  limit: number;
  setLimit: (n: number) => void;
  currentPage: number;
  maxPages: number;
  onLeft: () => void;
  onRight: () => void;
  disableRight?: boolean;
  name: string;
}