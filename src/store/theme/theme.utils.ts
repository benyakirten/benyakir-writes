import {
	STORED_IGNORE_COMPUTER_PREFERENCE,
	STORED_ACTIVE_THEME_ID,
	STORED_THEMES,
} from "@/data/constants";
import { defaultDayTheme, defaultNightTheme } from "./theme.state";

export function getDefaultThemeState(): ThemeState {
	let state: ThemeState;

	const ignoreComputerPreferences =
		localStorage.getItem(STORED_IGNORE_COMPUTER_PREFERENCE) === "true";
	const lastUsedThemeId = localStorage.getItem(STORED_ACTIVE_THEME_ID);
	const latestId =
		!lastUsedThemeId || Number.isNaN(+lastUsedThemeId) ? 1 : +lastUsedThemeId;
	try {
		const storedThemes = localStorage.getItem(STORED_THEMES);
		const themes: BaseTheme[] = storedThemes
			? JSON.parse(storedThemes)
			: [defaultDayTheme, defaultNightTheme];

		const storedActiveTheme = localStorage.getItem(STORED_ACTIVE_THEME_ID);
		const active =
			(storedActiveTheme && themes.find((t) => t.id === storedActiveTheme)) ||
			defaultDayTheme;

		state = { themes, active, ignoreComputerPreferences, latestId };
	} catch {
		state = {
			themes: [defaultDayTheme, defaultNightTheme],
			active: defaultDayTheme,
			ignoreComputerPreferences,
			latestId,
		};
	}

	if (!state.ignoreComputerPreferences) {
		state.active = determineComputerPreferredTheme(state);
	}
	return state;
}

export function determineComputerPreferredTheme(state: ThemeState) {
	const darkThemeTime = window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches;

	const themePreference = darkThemeTime ? "1" : "0";
	if (state.active.id !== themePreference) {
		return (
			state.themes.find((theme) => theme.id === themePreference) ?? state.active
		);
	}
	return state.active;
}
