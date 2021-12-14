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
    setTheme: (state, payload: PayloadAction<string>) => {
      const newTheme = state.themes.find(theme => theme.base.name === payload.payload);
      state.active = newTheme ? newTheme : state.active;
    }
  }
})

export const { toggleTimeOfDay, setTheme } = themeSlice.actions;

export default themeSlice.reducer