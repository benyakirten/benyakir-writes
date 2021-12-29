interface ModifyThemeProps {
  selectedTheme: string;
}


interface ThemeControlProps extends ModifyThemeProps {
  setSelectedTheme: (theme: string) => void;
}

interface SettingsGroupProps {
  title: string;
  preface: string;
  controls: ThemeGroup
  open: boolean;
  theme: BaseTheme;
  onOpen: () => void;
}