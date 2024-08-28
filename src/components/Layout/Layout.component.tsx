import * as React from "react";
import { useLocation } from "@reach/router";
import { Transition, TransitionGroup } from "react-transition-group";
import { ThemeProvider } from "styled-components";

import { GlobalStyles, LayoutContainer, MainContainer } from "./Layout.styles";
import Sidebar from "./Sidebar/Sidebar.component";
import {
	PAGE_TRANSITION_DURATION,
	getPageTransitionStyles,
} from "@/styles/transitions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	intializeThemeStore,
	setActiveThemeByName,
} from "@/store/theme/theme.slice";
import Search from "./Search";
import { inputIsFocused } from "@/utils/dom";
import { setSidebarState } from "@/store/sidebar/sidebar.slice";
import {
	STORED_PREFERENCE_KEY,
	STORED_THEMES,
	STORED_PREFERENCES,
} from "@/data/constants";

const Layout: React.FC<ChildrenProp> = ({ children }) => {
	const location = useLocation();
	const modalRef = React.useRef<HTMLDialogElement>(null);

	const themeStore = useAppSelector((root) => root.theme);
	const dispatch = useAppDispatch();

	const closeModal = () => modalRef.current?.close();
	const openModal = () => modalRef.current?.showModal();

	// Debug to reset storage of themes
	React.useEffect(() => {
		localStorage.clear();
	}, []);

	// TODO: Set versioning on theme storage
	// TODO: Allow a theme to be exported/imported as base64

	React.useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (inputIsFocused()) {
				return;
			}

			if ((e.ctrlKey || e.metaKey) && e.key === "/") {
				openModal();
			} else if (e.key === "Escape") {
				if (modalRef.current?.open) {
					closeModal();
				} else {
					dispatch(setSidebarState(false));
				}
			}
		};

		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	});

	React.useEffect(() => {
		const storedComputerPreferences =
			localStorage.getItem(STORED_PREFERENCE_KEY) === "true";
		const storedThemes = localStorage.getItem(STORED_THEMES);
		const storedPreference = localStorage
			.getItem(STORED_PREFERENCES)
			?.replace(/"/g, "");

		dispatch(
			intializeThemeStore({
				computerPreferences: storedComputerPreferences,
				themes: storedThemes,
				preference: storedPreference,
			}),
		);

		if (window?.matchMedia) {
			const darkColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

			const setThemeByPreference = (e: MediaQueryList) => {
				if (!storedComputerPreferences) {
					dispatch(setActiveThemeByName(e.matches ? "day" : "day"));
				}
			};

			const themePreferenceChange = (e: MediaQueryListEvent) =>
				setThemeByPreference(e.target as MediaQueryList);
			darkColorScheme.addEventListener("change", themePreferenceChange);
			setThemeByPreference(darkColorScheme);
			return () =>
				darkColorScheme.removeEventListener("change", themePreferenceChange);
		}
	}, [dispatch]);

	return (
		<ThemeProvider theme={themeStore.active}>
			<LayoutContainer>
				<GlobalStyles />
				<Search ref={modalRef} onClose={closeModal} />
				<Sidebar onSearch={openModal} />
				<MainContainer>
					<TransitionGroup>
						<Transition
							key={location.pathname}
							timeout={{
								enter: PAGE_TRANSITION_DURATION,
								exit: PAGE_TRANSITION_DURATION,
							}}
							unmountOnExit
						>
							{(status) => (
								<div
									style={{
										...getPageTransitionStyles(PAGE_TRANSITION_DURATION)[
											status
										],
									}}
								>
									{children}
								</div>
							)}
						</Transition>
					</TransitionGroup>
				</MainContainer>
			</LayoutContainer>
		</ThemeProvider>
	);
};

export default Layout;
