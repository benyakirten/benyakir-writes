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
import { useAppDispatch, useAppSelector } from "@Store/hooks";
import {
	intializeThemeStore,
	setActiveThemeByName,
} from "@Store/theme/theme.slice";
import Search from "./NewSearch";
import { isInputFocused } from "@/utils/dom";
import { setSidebarState } from "@/store/sidebar/sidebar.slice";

export const Head: React.FC = () => (
	<>
		<html lang="en" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
			href="https://fonts.googleapis.com/css2?family=SERIF_FONT&family=SANS_SERIF_FONT&display=swap"
			rel="stylesheet"
		/>
		<title>Benyakir Writes</title>
		<meta
			name="description"
			content="Benyakir Writes is my blog, an outlet for my latest works. Learn about the latest books, projects and short stories he's written.
              Or check out his blog posts, reviews of books or podcast episodes.."
		/>
	</>
);

const Layout: React.FC<ChildrenProp> = ({ children }) => {
	const location = useLocation();
	const modalRef = React.useRef<HTMLDialogElement>(null);

	const themeStore = useAppSelector((root) => root.theme);
	const dispatch = useAppDispatch();

	const closeModal = () => modalRef.current?.close();
	const openModal = () => modalRef.current?.showModal();

	React.useEffect(() => openModal(), []);

	React.useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (isInputFocused()) {
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
			localStorage.getItem("BWB_ICP") === "true";
		const storedThemes = localStorage.getItem("BWB_TS");
		const storedPreference = localStorage.getItem("BWB_TNP")?.replace(/"/g, "");

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
					dispatch(setActiveThemeByName(e.matches ? "night" : "day"));
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
				<Sidebar />
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
