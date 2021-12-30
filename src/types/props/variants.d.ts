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
    nodes: {
      name: string;
      publicURL: string;
    }[]
  }
}

interface SettingsGroupProps {
  title: string;
  preface: string;
  controls: ThemeGroup
  open: boolean;
  theme: BaseTheme;
  onOpen: () => void;
}