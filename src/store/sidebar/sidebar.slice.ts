import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "./sidebar.state";

const sidebarSlice = createSlice({
	name: "drag",
	initialState,
	reducers: {
		setSidebarState: (state, action: PayloadAction<boolean>) => {
			state.open = action.payload;
		},
		toggleSidebarState: (state) => {
			state.open = !state.open;
		},
	},
});

export const { setSidebarState, toggleSidebarState } = sidebarSlice.actions;

export default sidebarSlice.reducer;
