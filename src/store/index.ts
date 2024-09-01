import { type Middleware, configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "./sidebar/sidebar.slice";
import themeReducer from "./theme/theme.slice";

const otherMiddleware: Middleware[] = [];

/**
 * If we want to add middleware, we can
 */
// if (process.env.NODE_ENV === "development") {
// 	otherMiddleware.push(logger)
// }

const store = configureStore({
	reducer: {
		theme: themeReducer,
		sidebar: sidebarReducer,
	},
	middleware: (getDefaultMiddleWare) =>
		getDefaultMiddleWare().concat(...otherMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
