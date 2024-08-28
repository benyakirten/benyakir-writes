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
	const themePreference = darkThemeTime ? "night" : "day";
	if (state.active.name !== themePreference) {
		return (
			state.themes.find((theme) => theme.name === themePreference) ??
			state.active
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
			state.error = undefined;
			const { name } = state.active;
			const newTheme =
				name === "day"
					? state.themes.find((theme) => theme.name === "night")
					: state.themes.find((theme) => theme.name === "day");
			state.active = newTheme ? newTheme : state.active;
		},
		setActiveThemeByID: (state, action: PayloadAction<string>) => {
			state.error = undefined;
			const newTheme = state.themes.find(
				(theme) => theme.id === action.payload,
			);
			state.active = newTheme ? newTheme : state.active;
		},
		setActiveThemeByName: (state, action: PayloadAction<string>) => {
			state.error = undefined;
			const newTheme = state.themes.find(
				(theme) => theme.name === action.payload,
			);
			state.active = newTheme ? newTheme : state.active;
		},
		toggleUseComputerPreferences: (state) => {
			state.error = undefined;
			state.ignoreComputerPreferences = !state.ignoreComputerPreferences;
			localStorage.setItem(
				STORED_PREFERENCE_KEY,
				state.ignoreComputerPreferences.toString(),
			);
			if (!state.ignoreComputerPreferences) {
				state.active = determineComputerPreferredTheme(state);
			}
		},
		setThemePreferenceByIndex: (state, action: PayloadAction<number>) => {
			state.error = undefined;
			state.prefers = state.themes[action.payload].id;
			localStorage.setItem(STORED_PREFERENCES, state.prefers);
		},
		setThemePreferenceByID: (state, action: PayloadAction<string>) => {
			state.error = undefined;
			const preferredTheme = state.themes.find(
				(theme) => theme.id === action.payload,
			);
			if (!preferredTheme) {
				state.error = "Unable to locate theme";
				return;
			}
			state.prefers = preferredTheme.id;
			localStorage.setItem(STORED_PREFERENCES, state.prefers);
		},
		reorderThemes: (state, action: PayloadAction<ArrayItemsTransfer>) => {
			state.error = undefined;
			const { start, end, position } = action.payload;
			const startPosition = state.themes.findIndex(
				(theme) => theme.id === start,
			);
			const endPosition = state.themes.findIndex((theme) => theme.id === end);

			if (startPosition === -1 || endPosition === -1) {
				state.error = "An error occurred: invalid list movement";
				return;
			}

			let finalPosition = endPosition;
			if (position === DraggedOverPosition.SOUTH) {
				finalPosition++;
			}
			if (startPosition < endPosition) {
				finalPosition--;
			}

			const listLength = state.themes.length;
			if (startPosition === finalPosition) {
				return;
			}
			if (
				startPosition >= listLength ||
				startPosition < 0 ||
				endPosition >= listLength ||
				endPosition < 0 ||
				position === DraggedOverPosition.NONE
			) {
				state.error = "An error occurred: invalid list movement";
				return;
			}
			[state.themes[startPosition], state.themes[endPosition]] = [
				state.themes[endPosition],
				state.themes[startPosition],
			];
			localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
		},
		copyThemeByID: (state, action: PayloadAction<string>) => {
			state.error = undefined;
			const copiedTheme = state.themes.find(
				(theme) => theme.id === action.payload,
			);

			if (!copiedTheme) {
				state.error = "Unable to find theme to copy";
				return;
			}

			try {
				const { name, id } = copyTheme(copiedTheme, state);
				// @ts-ignore
				state.themes.push({ ...copiedTheme, name, id });
				localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
			} catch {
				state.error = "Unable to create new theme";
			}
		},
		copyThemeByIndex: (state, action: PayloadAction<number>) => {
			// Normally, I would create a deep copy of the desired theme
			// i.e. const copiedTheme = { ...state.themes[action.payload] }
			// then modify its name property and append it to the list.
			// However, because redux toolkit uses proxies in createSlice
			// even a deep copy's changed properties will effect the original
			state.error = undefined;
			const copiedTheme = state.themes[action.payload];
			if (!copiedTheme) {
				state.error = "Unable to find theme to copy";
				return;
			}
			try {
				const { name, id } = copyTheme(copiedTheme, state);
				// @ts-ignore
				state.themes.push({ ...copiedTheme, name, id });
				localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
			} catch {
				state.error = "Unable to create new theme";
			}
		},
		createTheme: (state) => {
			state.error = undefined;
			try {
				const { name, id } = copyTheme(defaultDayTheme, state);
				// @ts-ignore
				state.themes.push({ ...defaultDayTheme, name, id });
				localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
			} catch {
				state.error = "Unable to create new theme";
			}
		},
		updateTheme: (
			state,
			action: PayloadAction<{ id: string; theme: BaseTheme }>,
		) => {
			state.error = undefined;
			const { id, theme } = action.payload;
			const themeToUpdateIndex = state.themes.findIndex(
				(theme) => theme.id === id,
			);
			if (themeToUpdateIndex === -1) {
				state.error = "Theme to update cannot be located";
				return;
			}
			if (
				state.themes[themeToUpdateIndex].name === "day" ||
				state.themes[themeToUpdateIndex].name === "night"
			) {
				state.error = "Day and night themes are immutable";
			}
			state.themes[themeToUpdateIndex] = theme;
			localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
		},
		deleteThemeByIndex: (state, action: PayloadAction<number>) => {
			state.error = undefined;
			const theme = state.themes[action.payload];
			if (!theme || theme.name === "day" || theme.name === "night") {
				state.error = "Day and night themes cannot be deleted";
				return;
			}
			if (state.active.id === theme.id) {
				state.active = state.themes[action.payload === 0 ? 1 : 0];
			}
			if (state.prefers === theme.name) {
				state.prefers = state.themes[action.payload === 0 ? 1 : 0].name;
			}
			state.themes.splice(action.payload, 1);
			localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
		},
		deleteThemeByID: (state, action: PayloadAction<string>) => {
			state.error = undefined;
			if (action.payload === "0" || action.payload === "1") {
				state.error = "Day and night themes cannot be deleted";
				return;
			}
			const themeIndexToDelete = state.themes.findIndex(
				(theme) => theme.id === action.payload,
			);
			if (state.active.id === action.payload) {
				state.active = state.themes[themeIndexToDelete === 0 ? 1 : 0];
			}
			if (state.prefers === state.themes[themeIndexToDelete].name) {
				state.prefers = state.themes[themeIndexToDelete === 0 ? 1 : 0].name;
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
			state.error = undefined;
			const { id, newVal } = action.payload;
			const theme = state.themes.find((theme) => theme.id === id);
			const nameTaken = state.themes.find((theme) => theme.name === newVal);
			if (!theme) {
				state.error = "Unable to locate theme";
				return;
			}
			if (theme.name === "day" || theme.name === "night" || !!nameTaken) {
				state.error = "Day and night themes are immutable";
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
			state.error = undefined;
			const { id, props, newVal } = action.payload;
			const accessor = state.themes.find((theme) => theme.id === id);

			if (!accessor) {
				state.error = "Unable to locate theme to modify";
				return;
			}
			if (accessor.name === "day" || accessor.name === "night") {
				state.error = "Day and night themes are immutable";
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
		dismissThemeError: (state) => {
			state.error = undefined;
		},
		setThemeError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
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
			state.prefers = action.payload.preference ?? defaultDayTheme.id;
			if (state.prefers && state.ignoreComputerPreferences) {
				const activeTheme = state.themes.find(
					(theme) => theme.id === state.prefers,
				);
				state.active = activeTheme ?? state.active;
			}
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
	setActiveThemeByName,
	toggleUseComputerPreferences,
	setThemePreferenceByIndex,
	setThemePreferenceByID,
	reorderThemes,
	copyThemeByID,
	copyThemeByIndex,
	createTheme,
	updateTheme,
	deleteThemeByIndex,
	deleteThemeByID,
	changeThemeName,
	changePropOnTheme,
	dismissThemeError,
	setThemeError,
	intializeThemeStore,
	resetThemeOptions,
} = themeSlice.actions;

export default themeSlice.reducer;

export const flattenedThemeShape = flattenTheme(initialState.active);
