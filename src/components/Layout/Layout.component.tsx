import { useLocation } from "@reach/router";
import * as React from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { ThemeProvider } from "styled-components";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSidebarState } from "@/store/sidebar/sidebar.slice";
import {
	initializeThemeState,
	setActiveThemeByID,
} from "@/store/theme/theme.slice";
import {
	PAGE_TRANSITION_DURATION,
	getPageTransitionStyles,
} from "@/styles/transitions";
import { inputIsFocused } from "@/utils/dom";
import { GlobalStyles, LayoutContainer, MainContainer } from "./Layout.styles";
import Search from "./Search";
import Shortcuts from "./Shortcuts/Shortcuts.component";
import Sidebar from "./Sidebar/Sidebar.component";

const Layout: React.FC<ChildrenProp> = ({ children }) => {
	const location = useLocation();
	const searchModalRef = React.useRef<HTMLDialogElement>(null);
	const keyboaradShortcutModalRef = React.useRef<HTMLDialogElement>(null);

	const themeStore = useAppSelector((root) => root.theme);
	const dispatch = useAppDispatch();

	const closeAllModals = () => {
		searchModalRef.current?.close();
		keyboaradShortcutModalRef.current?.close();
	};
	const openSearch = () => searchModalRef.current?.showModal();
	const openShortcuts = () => keyboaradShortcutModalRef.current?.showModal();

	React.useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (inputIsFocused()) {
				return;
			}

			if (e.key === "?" && e.shiftKey) {
				keyboaradShortcutModalRef.current?.open
					? closeAllModals()
					: openShortcuts();
				return;
			}

			if (e.key === "<" && e.shiftKey) {
				dispatch(setSidebarState(false));
				return;
			}

			if (e.key === ">" && e.shiftKey) {
				dispatch(setSidebarState(true));
				return;
			}

			if ((e.ctrlKey || e.metaKey) && e.key === "/") {
				openSearch();
				return;
			}

			if (e.key === "Escape") {
				if (searchModalRef.current?.open) {
					closeAllModals();
				} else {
					dispatch(setSidebarState(false));
				}
			}
		};

		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	});

	React.useEffect(() => {
		dispatch(initializeThemeState());
	}, [dispatch]);

	React.useEffect(() => {
		if (window?.matchMedia) {
			const darkColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

			const setThemeByPreference = (e: MediaQueryList) => {
				if (themeStore.ignoreComputerPreferences) {
					return;
				}

				dispatch(setActiveThemeByID(e.matches ? "1" : "0"));
			};

			const themePreferenceChange = (e: MediaQueryListEvent) =>
				setThemeByPreference(e.target as MediaQueryList);
			darkColorScheme.addEventListener("change", themePreferenceChange);

			return () =>
				darkColorScheme.removeEventListener("change", themePreferenceChange);
		}
	}, [dispatch, themeStore]);

	return (
		<ThemeProvider theme={themeStore.active}>
			<LayoutContainer>
				<GlobalStyles />
				<Search ref={searchModalRef} onClose={closeAllModals} />
				<Shortcuts ref={keyboaradShortcutModalRef} onClose={closeAllModals} />
				<Sidebar onSearch={openSearch} onOpenShortcuts={openShortcuts} />
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
