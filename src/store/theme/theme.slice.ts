import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initialState } from './theme.state'
import { DraggedOverPosition } from '@Utils/enums';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTimeOfDay: (state) => {
      const { name } = state.active.base;
      const newTheme = name === 'day'
        ? state.themes.find(theme => theme.base.name === 'night')
        : state.themes.find(theme => theme.base.name === 'day');
      state.active = newTheme ? newTheme : state.active;
    },
    setThemeByName: (state, action: PayloadAction<string>) => {
      const newTheme = state.themes.find(theme => theme.base.name === action.payload)
      state.active = newTheme ? newTheme : state.active
    },
    setThemeByIndex: (state, action: PayloadAction<number>) => {
      const newTheme = state.themes[action.payload]
      state.active = newTheme ? newTheme : state.active
    },
    toggleUseComputerPreferences: (state) => {
      state.ignoreComputerPreferences = !state.ignoreComputerPreferences
      localStorage.setItem('BWB_ICP', state.ignoreComputerPreferences.toString())
      if (!state.ignoreComputerPreferences) {
        const darkThemeTime = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (state.active.base.name !== 'day' && !darkThemeTime) {
          state.active = state.themes.find(theme => theme.base.name === 'day') ?? state.active
        } else if (state.active.base.name !== 'night' && darkThemeTime) {
          state.active = state.themes.find(theme => theme.base.name === 'night') ?? state.active
        }
      }
    },
    setThemePreferenceByIndex: (state, action: PayloadAction<number>) => {
      state.prefers = state.themes[action.payload].base.name
      localStorage.setItem('BWB_TNP', state.prefers)
    },
    reorderThemes: (state, action: PayloadAction<ArrayIndexTransfer>) => {
      const { start, end, position } = action.payload
      let finalPosition = position === DraggedOverPosition.NORTH ? end : end + 1
      if (start < end) {
        finalPosition--
      }
      const listLength = state.themes.length
      if (
        start >= listLength || start < 0 ||
        end >= listLength || end < 0 ||
        start === end ||
        position === DraggedOverPosition.NONE ||
        start === finalPosition
      ) {
        return
      }
      const startItem = state.themes[start]
      const alteredList = [...state.themes.slice(0, start), ...state.themes.slice(start + 1)]
      alteredList.splice(finalPosition, 0, startItem)
      state.themes = alteredList
      localStorage.setItem('BWB_TS', JSON.stringify(state.themes))
    },
    copyThemeByIndex: (state, action: PayloadAction<number>) => {
      // Normally, I would create a deep copy of the desired theme
      // i.e. const copiedTheme = { ...state.themes[action.payload] }
      // then modify its name property and append it to the list.
      // However, because redux toolkit uses proxies in createSlice
      // even a deep copy's changed properties will effect the original
      const copiedTheme = state.themes[action.payload]
      let { name } = copiedTheme.base
      let nameIndex = 1
      const match = name.match(/\d+$/)
      if (match) {
        const digits = match[0]
        name = name.slice(0, -digits.length)
        nameIndex = +digits + 1
      }
      let finalName = `${name}${nameIndex}`
      while (state.themes.find(theme => theme.base.name === finalName)) {
        nameIndex++
        if (nameIndex > 10e10) {
          throw new Error("Unable to create new theme");
        }
        finalName = `${name}${nameIndex}`
      }
      state.themes = [
        ...state.themes,
        {
          ...copiedTheme,
          base: {
            ...copiedTheme.base,
            name: finalName
          }
        }
      ]
      localStorage.setItem('BWB_TS', JSON.stringify(state.themes))
    },
    createTheme: (state) => {
      const newTheme = state.themes.find(theme => theme.base.name === 'day')!
      let nameIndex = 1
      while (state.themes.find(theme => theme.base.name === `day${nameIndex}`)) {
        nameIndex++
        if (nameIndex > 10e10) {
          throw new Error("Unable to create new theme");
        }
      }
      newTheme.base.name = `day${nameIndex}`
      state.themes = [...state.themes, newTheme]
      state.active = newTheme
    },
    updateTheme: (state, action: PayloadAction<{ index: number, theme: BaseTheme }>) => {
      const { index, theme } = action.payload;
      if (index >= state.themes.length) {
        return
      }
      state.themes[index] = theme
      localStorage.setItem('BWB_TS', JSON.stringify(state.themes))
    },
    deleteThemeByIndex: (state, action: PayloadAction<number>) => {
      const theme = state.themes[action.payload]
      if (!theme || theme.base.name === 'day' || theme.base.name === 'night') {
        return
      }
      state.themes.splice(action.payload, 1);
      localStorage.setItem('BWB_TS', JSON.stringify(state.themes))
    },
    deleteThemeByName: (state, action: PayloadAction<string>) => { 
      if (action.payload === 'day' || action.payload === 'night') {
        return
      }
      state.themes = state.themes.filter(theme => theme.base.name !== action.payload)
      localStorage.setItem('BWB_TS', JSON.stringify(state.themes))
    },
    intializeThemeStore: (state, action: PayloadAction<{
      computerPreferences: boolean,
      themes: string | null,
      preference: string | null
    }>) => {
      state.ignoreComputerPreferences = action.payload.computerPreferences
      state.themes = action.payload.themes ? JSON.parse(action.payload.themes) as BaseTheme[] : state.themes
      state.prefers = action.payload.preference ?? 'day'
      if (state.prefers) {
        const activeTheme = state.themes.find(theme => theme.base.name === state.prefers)
        state.active = activeTheme ?? state.active
      }
    }
  }
})

export const {
  toggleTimeOfDay,
  setThemeByName,
  setThemeByIndex,
  toggleUseComputerPreferences,
  setThemePreferenceByIndex,
  reorderThemes,
  copyThemeByIndex,
  createTheme,
  updateTheme,
  deleteThemeByIndex,
  deleteThemeByName,
  intializeThemeStore
} = themeSlice.actions;

export default themeSlice.reducer