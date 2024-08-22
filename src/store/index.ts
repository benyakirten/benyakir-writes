import { configureStore, type Middleware } from "@reduxjs/toolkit";

import dragReducer from "./drag/drag.slice";
import sidebarReducer from "./sidebar/sidebar.slice";
import themeReducer from "./theme/theme.slice";

const otherMiddleware: Middleware[] = [];

if (process.env.NODE_ENV === "development") {
	// otherMiddleware.push(logger)
}

const store = configureStore({
	reducer: {
		theme: themeReducer,
		drag: dragReducer,
		sidebar: sidebarReducer,
	},
	middleware: (getDefaultMiddleWare) =>
		getDefaultMiddleWare().concat(...otherMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
