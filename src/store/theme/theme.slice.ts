import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { defaultDayTheme, initialState } from "./theme.state";
import { DraggedOverPosition } from "@/utils/enums";
import { flattenTheme } from "@/utils/other";
import { ArrayItemsTransfer, StringLookup } from "@/types/general";
import {
	STORED_PREFERENCE_KEY,
	STORED_PREFERENCES,
	STORED_THEMES,
} from "@/data/constants";

function determineComputerPreferredTheme(state: ThemeState) {
	const darkThemeTime = window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches;
	const themePreference = darkThemeTime ? "1" : "0";
	if (state.active.name !== themePreference) {
		return (
			state.themes.find((theme) => theme.id === themePreference) ?? state.active
		);
	}
	return state.active;
}

function getLatestId(state: ThemeState) {
	return state.themes.reduce((acc, next) => {
		const nextId = +next.id;
		return Number.isNaN(nextId) || acc > nextId ? acc : nextId;
	}, -1);
}

function copyTheme(
	copiedTheme: BaseTheme,
	state: ThemeState,
): { name: string; id: string } {
	let { name } = copiedTheme;
	let nameIndex = 1;
	const match = name.match(/\d+$/);
	if (match) {
		const digits = match[0];
		name = name.slice(0, -digits.length);
		nameIndex = +digits + 1;
	}

	let finalName = `${name}${nameIndex}`;

	while (state.themes.find((theme) => theme.name === finalName)) {
		nameIndex++;
		if (nameIndex > 10e10) {
			throw new Error("Unable to create new theme");
		}
		finalName = `${name}${nameIndex}`;
	}

	const id = getLatestId(state) + 1;
	return { name: finalName, id: id.toString() };
}

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTimeOfDay: (state) => {
			const { name } = state.active;
			const newTheme =
				name === "day"
					? state.themes.find((theme) => theme.id === "1")
					: state.themes.find((theme) => theme.id === "0");
			state.active = newTheme ? newTheme : state.active;
		},

		setActiveThemeByID: (state, action: PayloadAction<string>) => {
			const newTheme = state.themes.find(
				(theme) => theme.id === action.payload,
			);
			state.active = newTheme ? newTheme : state.active;
		},

		toggleUseComputerPreferences: (state) => {
			state.ignoreComputerPreferences = !state.ignoreComputerPreferences;
			localStorage.setItem(
				STORED_PREFERENCE_KEY,
				state.ignoreComputerPreferences.toString(),
			);
			if (!state.ignoreComputerPreferences) {
				state.active = determineComputerPreferredTheme(state);
			}
		},

		copyThemeByID: (state, action: PayloadAction<string>) => {
			const copiedTheme = state.themes.find(
				(theme) => theme.id === action.payload,
			);

			if (!copiedTheme) {
				return;
			}

			try {
				const { name, id } = copyTheme(copiedTheme, state);
				// @ts-ignore
				state.themes.push({ ...copiedTheme, name, id });
				localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
			} catch {}
		},

		createTheme: (state) => {
			try {
				const { name, id } = copyTheme(defaultDayTheme, state);
				state.themes.push({ ...defaultDayTheme, name, id });
				localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
			} catch {}
		},

		updateTheme: (
			state,
			action: PayloadAction<{ id: string; theme: BaseTheme }>,
		) => {
			const { id, theme } = action.payload;
			const themeToUpdateIndex = state.themes.findIndex(
				(theme) => theme.id === id,
			);
			if (themeToUpdateIndex === -1) {
				return;
			}

			state.themes[themeToUpdateIndex] = theme;
			localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
		},

		deleteThemeByID: (state, action: PayloadAction<string>) => {
			if (action.payload === "0" || action.payload === "1") {
				return;
			}

			const themeIndexToDelete = state.themes.findIndex(
				(theme) => theme.id === action.payload,
			);

			if (state.active.id === action.payload) {
				state.active = state.themes[themeIndexToDelete === 0 ? 1 : 0];
			}

			state.themes = state.themes.filter(
				(theme) => theme.id !== action.payload,
			);
			localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
		},

		changeThemeName: (
			state,
			action: PayloadAction<{ id: string; newVal: string }>,
		) => {
			const { id, newVal } = action.payload;
			const theme = state.themes.find((theme) => theme.id === id);
			const nameTaken = !!state.themes.find((theme) => theme.name === newVal);

			if (!theme) {
				return;
			}
			if (theme.name === "day" || theme.name === "night" || nameTaken) {
				return;
			}

			theme.name = newVal;
			if (state.active.id === id) {
				state.active =
					state.themes.find((theme) => theme.id === id) ?? state.active;
			}
			localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
		},

		changePropOnTheme: (
			state,
			action: PayloadAction<{ id: string; props: string[]; newVal: string }>,
		) => {
			const { id, props, newVal } = action.payload;
			const accessor = state.themes.find((theme) => theme.id === id);

			if (!accessor || accessor.id === "0" || accessor.id === "1") {
				return;
			}

			function recursiveAccess(
				obj: RecursiveControlGroup,
				accessor: string[],
			): StringLookup | undefined {
				if (accessor.length === 1) {
					return obj[accessor[0]] as StringLookup;
				}
				if (obj[accessor[0]]) {
					return recursiveAccess(
						obj[accessor[0]] as RecursiveControlGroup,
						accessor.slice(1),
					);
				}
				return;
			}
			const finalAccessor = recursiveAccess(accessor, props.slice(0, -1));
			if (!finalAccessor) {
				return;
			}

			const finalProp = props[props.length - 1];
			finalAccessor[finalProp] = newVal;
			if (state.active.id === id) {
				state.active =
					state.themes.find((theme) => theme.id === id) ?? state.active;
			}
			localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
		},
		intializeThemeStore: (
			state,
			action: PayloadAction<{
				computerPreferences: boolean;
				themes: string | null;
				preference: string | null | undefined;
			}>,
		) => {
			state.ignoreComputerPreferences = action.payload.computerPreferences;
			state.themes = action.payload.themes
				? (JSON.parse(action.payload.themes) as BaseTheme[])
				: state.themes;
			// Find the last active theme from local storage
			const activeTheme = state.themes.find(
				// @ts-ignore
				(theme) => theme.id === state.prefers,
			);
			state.active = activeTheme ?? state.active;
		},
		resetThemeOptions: () => {
			localStorage.removeItem(STORED_THEMES);
			localStorage.removeItem(STORED_PREFERENCES);
			localStorage.removeItem(STORED_PREFERENCE_KEY);
			const defaultState = { ...initialState };
			defaultState.active = determineComputerPreferredTheme(defaultState);
			return defaultState;
		},
	},
});

export const {
	toggleTimeOfDay,
	setActiveThemeByID,
	toggleUseComputerPreferences,
	copyThemeByID,
	createTheme,
	updateTheme,
	deleteThemeByID,
	changeThemeName,
	changePropOnTheme,
	intializeThemeStore,
	resetThemeOptions,
} = themeSlice.actions;

export default themeSlice.reducer;

export const flattenedThemeShape = flattenTheme(initialState.active);
