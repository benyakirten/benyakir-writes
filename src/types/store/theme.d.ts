interface ThemeState {
  themes: BaseTheme[];
  useComputerPreferences: boolean;
  prefers: ColorPreference;
  active: BaseTheme;
  autoLoad: boolean;
}

type ColorPreference = 'day' | 'night';

interface BasicThemeSection {
  background: string;
  textColor: string;
}

interface ThemeBase extends BasicThemeSection {
  name: string;
  border: string;
  shadowColor: string;
  disabled: string;
}

interface ThemeSearchBox extends BasicThemeSection {
  border: string;
  background: string;
  textColor: string;
  resultTextColor: string;
  resultBorderColor: string;
}

interface ThemeSidebar {
  primaryColor: string;
  useGradient: boolean;
  primaryColorEnd: number;
  secondaryColor: string;
  shadowColor: string;
}

interface ThemePaginate {
  textColor: string;
  arrowColor: string;
  pageNumberColor: string;
}

interface ThemeTextInput extends BasicThemeSection {
  border: string;
}

interface ThemeFilter extends BasicThemeSection {}

interface ThemeCheckbox {
  border: string;
  fingerColor: string;
  backgroundColor: string;
}

interface ThemeMultipleChoice extends BasicThemeSection {}

interface ThemeLink {
  normal: string
  inline: string;
  dark: string;
}

interface ThemeIcon {
  default: BasicThemeSection;
  hover: BasicThemeSection;
}

interface ThemeHoverImage {
  textColor: string;
  hoveredTextColor: string;
}

interface ButtonTheme {
  border: string;
  default: BasicThemeSection;
  disabled: BasicThemeSection;
  hover: BasicThemeSection;
}

interface ThemeAlertBox {
  textColor: string;
  alert: {
    success: string;
    error: string;
  }
}

interface ThemeToggle {
  onColor: string;
  onBackground: string;
  offColor: string;
  offBackground: string;
  border: string;
}

interface ThemeSkewRow {
  background: string;
}

interface BaseTheme {
  base: ThemeBase;
  searchBox: ThemeSearchBox;
  sidebar: ThemeSidebar;
  paginate: ThemePaginate;
  textInput: ThemeTextInput;
  filter: ThemeFilter;
  checkbox: ThemeCheckbox;
  multipleChoice: ThemeMultipleChoice;
  link: ThemeLink;
  icon: ThemeIcon;
  skewRow: ThemeSkewRow;
  hoverImage: ThemeHoverImage;
  button: ButtonTheme;
  alertBox: ThemeAlertBox;
  toggle: ThemeToggle;
}

interface FullTheme extends BaseTheme {
  fontExtraSmall: CSSMeasure;
  fontSmall: CSSMeasure;
  fontMedium: CSSMeasure;
  fontLarge: CSSMeasure;
  fontExtraLarge: CSSMeasure;
  fontTitle: CSSMeasure;
  fontBanner: CSSMeasure;
}