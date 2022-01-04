interface ModifyThemeProps {
  selectedTheme: string;
  open: boolean;
}

interface ThemeControlProps extends ModifyThemeProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
}

interface ThemeIconsQuery {
  allFile: {
    nodes: FileNode[]
  }
}

interface DraggableThemeListProps {
  open: boolean;
  onSelect: (val: string) => void;
  selectedTheme: string;
}

interface DraggableThemeProps {
  nodes: FileNode[]
  open: boolean;
  themeName: string;
  themeId: string;
}

interface DestinationThemeListProps {
  setSelectedTheme: (val: string) => void;
  selectedTheme: string;
}

interface SettingsGroupProps {
  title: string;
  preface: string;
  controls: ThemeGroup
  open: boolean;
  theme: BaseTheme;
  onOpen: () => void;
}