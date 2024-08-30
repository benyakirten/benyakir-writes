import { defaultDayTheme, defaultNightTheme } from "./theme.utils";

export const initialState: ThemeState = {
	themes: [defaultDayTheme, defaultNightTheme],
	ignoreComputerPreferences: false,
	active: defaultDayTheme,
	latestId: 1,
};
