import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './theme.state'

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
    setTheme: (state, payload: PayloadAction<{ index: number}>) => {
      const { index } = payload.payload
      const newTheme = state.themes[index]
      state.active = newTheme ? newTheme : state.active
    },
    toggleUseComputerPreferences: (state) => {
      state.ignoreComputerPreferences = !state.ignoreComputerPreferences
      localStorage.setItem('BWB_ICP', state.ignoreComputerPreferences.toString())
    },
    setPreference: (state, payload: PayloadAction<string>) => {
      localStorage.setItem('BWB_TNP', payload.payload)
      state.prefers = payload.payload
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
      state.themes = [ ...state.themes, newTheme ]
      state.active = newTheme
    },
    updateTheme: (state, payload: PayloadAction<{ index: number, theme: BaseTheme}>) => {
      const { index, theme } = payload.payload;
      if (index >= state.themes.length) {
        return
      }
      state.themes[index] = theme
      localStorage.set('BWB_TS', JSON.stringify(state.themes))
    },
    removeTheme: (state, payload: PayloadAction<{ name: string }>) => {
      const { name } = payload.payload
      if (name === 'day' || name === 'night') {
        return
      }
      state.themes = state.themes.filter(theme => theme.base.name !== name)
      localStorage.set('BWB_TS', JSON.stringify(state.themes))
    }
  }
})

export const {
  toggleTimeOfDay,
  setTheme,
  toggleUseComputerPreferences,
  setPreference,
  createTheme,
  updateTheme,
  removeTheme
} = themeSlice.actions;

export default themeSlice.reducer