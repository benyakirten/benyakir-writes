import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState, defaultDayTheme } from "./theme.state";
import { StringLookup } from "@/types/general";
import {
	STORED_IGNORE_COMPUTER_PREFERENCE,
	STORED_ACTIVE_THEME_ID,
	STORED_THEMES,
} from "@/data/constants";
import {
	determineComputerPreferredTheme,
	getDefaultThemeState,
} from "./theme.utils";

function copyTheme(
	copiedTheme: BaseTheme,
	state: ThemeState,
): { name: string; id: number } {
	let { name } = copiedTheme;
	const match = name.match(/\d+$/);
	if (match) {
		const digits = match[0];
		name = name.slice(0, -digits.length);
	}

	let themeId = state.latestId;
	if (themeId >= Number.MAX_SAFE_INTEGER) {
		themeId = -1;
	} else if (themeId < 0) {
		themeId--;
	} else {
		themeId++;
	}

	return { name: `${name}${themeId}`, id: themeId };
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
			localStorage.setItem(STORED_ACTIVE_THEME_ID, state.active.id);
		},

		initializeThemeState: (state) => {
			const { themes, latestId, ignoreComputerPreferences, active } =
				getDefaultThemeState();

			state.themes = themes;
			state.latestId = latestId;
			state.ignoreComputerPreferences = ignoreComputerPreferences;
			state.active = active;
		},

		setActiveThemeByID: (state, action: PayloadAction<string>) => {
			const newTheme = state.themes.find(
				(theme) => theme.id === action.payload,
			);
			state.active = newTheme ? newTheme : state.active;
			localStorage.setItem(STORED_ACTIVE_THEME_ID, state.active.id);
		},

		toggleUseComputerPreferences: (state) => {
			state.ignoreComputerPreferences = !state.ignoreComputerPreferences;
			if (!state.ignoreComputerPreferences) {
				state.active = determineComputerPreferredTheme(state);
			}

			localStorage.setItem(
				STORED_IGNORE_COMPUTER_PREFERENCE,
				state.ignoreComputerPreferences.toString(),
			);
		},

		copyThemeByID: (state, action: PayloadAction<string>) => {
			const copiedTheme = state.themes.find(
				(theme) => theme.id === action.payload,
			);

			if (!copiedTheme) {
				return;
			}

			const { name, id } = copyTheme(copiedTheme, state);
			state.themes.push({ ...copiedTheme, name, id: id.toString() });
			state.latestId = id;
			localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
			localStorage.setItem(STORED_ACTIVE_THEME_ID, id.toString());
		},

		createTheme: (state) => {
			const { name, id } = copyTheme(defaultDayTheme, state);
			state.latestId = id;
			state.themes.push({ ...defaultDayTheme, name, id: id.toString() });

			localStorage.setItem(STORED_ACTIVE_THEME_ID, state.latestId.toString());
			localStorage.setItem(STORED_THEMES, JSON.stringify(state.themes));
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
				localStorage.setItem(STORED_ACTIVE_THEME_ID, state.active.id);
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

			if (!accessor) {
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

		resetThemeOptions: () => {
			localStorage.removeItem(STORED_THEMES);
			localStorage.removeItem(STORED_ACTIVE_THEME_ID);
			localStorage.removeItem(STORED_IGNORE_COMPUTER_PREFERENCE);

			return getDefaultThemeState();
		},
	},
});

export const {
	initializeThemeState,
	toggleTimeOfDay,
	setActiveThemeByID,
	toggleUseComputerPreferences,
	copyThemeByID,
	createTheme,
	updateTheme,
	deleteThemeByID,
	changeThemeName,
	changePropOnTheme,
	resetThemeOptions,
} = themeSlice.actions;

export default themeSlice.reducer;
