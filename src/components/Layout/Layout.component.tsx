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
import Sidebar from "./Sidebar/Sidebar.component";

const Layout: React.FC<ChildrenProp> = ({ children }) => {
	const location = useLocation();
	const modalRef = React.useRef<HTMLDialogElement>(null);

	const themeStore = useAppSelector((root) => root.theme);
	const dispatch = useAppDispatch();

	const closeModal = () => modalRef.current?.close();
	const openModal = () => modalRef.current?.showModal();

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
		dispatch(initializeThemeState());
	}, [dispatch]);

	React.useEffect(() => {
		localStorage.clear();
		return localStorage.clear;
	}, []);

	React.useEffect(() => {
		if (window?.matchMedia) {
			const darkColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

			const setThemeByPreference = (e: MediaQueryList) => {
				if (themeStore.ignoreComputerPreferences) {
					return;
				}

				dispatch(setActiveThemeByID(e.matches ? "1" : "1"));
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
