import * as React from "react";
import { useLocation } from "@reach/router";

import Logo from "../Logo/Logo.component";
import {
	ArrowButton,
	LegalBox,
	LegalItem,
	NavGroup,
	SidebarBackdrop,
	SidebarContents,
	StyledSidebar,
	VisibleGroup,
} from "./Sidebar.styles";

import { Toggle } from "@Input";

import { capitalize } from "@Utils/strings";

import { useAppDispatch, useAppSelector } from "@Store/hooks";
import { toggleTimeOfDay } from "@Store/theme/theme.slice";

import {
	setSidebarState,
	toggleSidebarState,
} from "@/store/sidebar/sidebar.slice";
import { NavLink, ActiveIndicator } from "./components";

const Sidebar: React.FC = () => {
	const portfolioRef = React.useRef<HTMLElement>(null);
	const blogRef = React.useRef<HTMLElement>(null);
	const authorRef = React.useRef<HTMLElement>(null);
	const projectsRef = React.useRef<HTMLElement>(null);
	const themeRef = React.useRef<HTMLElement>(null);
	const contactRef = React.useRef<HTMLElement>(null);
	const homeRef = React.useRef<HTMLElement>(null);

	const location = useLocation();

	function isActive(link: string) {
		return location.pathname.includes(`/${link}/`);
	}

	const [opening, setOpening] = React.useState<boolean>(false);

	const dispatch = useAppDispatch();
	const open = useAppSelector((root) => root.sidebar.open);
	const activeTheme = useAppSelector((root) => root.theme.active);

	function toggleOpen() {
		dispatch(toggleSidebarState());
		setOpening(true);
		setTimeout(() => setOpening(false), 300);
	}

	function handleNavClick(e: React.BaseSyntheticEvent) {
		if (e.target.getAttribute("data-navtoggle") === "nav-toggle") {
			toggleOpen();
		}
	}

	return (
		<>
			<SidebarBackdrop
				open={open}
				onClick={() => dispatch(setSidebarState(false))}
			/>
			<StyledSidebar
				className={open ? "nav-toggle-open" : "nav-toggle-close"}
				data-navtoggle="nav-toggle"
				onClick={handleNavClick}
				open={open}
			>
				<ArrowButton
					tabIndex={0}
					open={open}
					onClick={toggleOpen}
					data-cy="open-sidemenu"
					aria-label={open ? "Close Sidebar" : "Open Sidebar"}
				>
					&larr;
				</ArrowButton>
				<SidebarContents
					className={open ? "nav-toggle-open" : "nav-toggle-close"}
					data-navtoggle="nav-toggle"
					open={open}
				>
					<VisibleGroup
						className={open ? "nav-toggle-open" : "nav-toggle-close"}
						data-navtoggle="nav-toggle"
						aria-hidden={!open}
						open={open}
					>
						<NavGroup>
							<ActiveIndicator
								refs={[
									portfolioRef,
									blogRef,
									authorRef,
									projectsRef,
									themeRef,
									contactRef,
									homeRef,
								]}
							/>
							<NavLink
								active={isActive("portfolio")}
								tabIndex={open ? 0 : -1}
								to="/portfolio"
								ref={portfolioRef}
							>
								Portfolio
							</NavLink>
							<NavLink
								active={isActive("blog")}
								tabIndex={open ? 0 : -1}
								to="/blog"
								ref={blogRef}
							>
								Blog
							</NavLink>
							<NavLink
								active={isActive("author")}
								tabIndex={open ? 0 : -1}
								to="/author"
								ref={authorRef}
							>
								Author
							</NavLink>
							<NavLink
								active={isActive("projects")}
								tabIndex={open ? 0 : -1}
								to="/projects"
								ref={projectsRef}
							>
								Projects
							</NavLink>
							<NavLink
								active={isActive("theme")}
								tabIndex={open ? 0 : -1}
								to="/theme"
								ref={themeRef}
							>
								Theme
							</NavLink>
							<NavLink
								active={isActive("contact")}
								tabIndex={open ? 0 : -1}
								to="/contact"
								ref={contactRef}
							>
								Contact
							</NavLink>
							<NavLink
								active={location.pathname === "/"}
								tabIndex={open ? 0 : -1}
								to="/"
								ref={homeRef}
							>
								Home
							</NavLink>
						</NavGroup>
						<div>
							<Toggle
								value={activeTheme.name === "night"}
								onToggle={() => dispatch(toggleTimeOfDay())}
								label={`Theme: ${capitalize(activeTheme.name)}`}
								name="active-theme-toggle"
								dataCy="sidebar-theme-toggle"
							/>
						</div>
						<LegalBox>
							<LegalItem>&copy; 2021-2024 by Benyakir Horowitz</LegalItem>
							<LegalItem>All Rights Reserved</LegalItem>
						</LegalBox>
					</VisibleGroup>
				</SidebarContents>
				<Logo opening={opening} open={open} />
			</StyledSidebar>
		</>
	);
};

export default Sidebar;
