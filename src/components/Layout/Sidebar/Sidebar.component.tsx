import * as React from "react";
import { useLocation } from "@reach/router";

import Logo from "./components/Logo/Logo.component";
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
import OpenSearchButton from "./components/OpenSearchButton.component";

const Sidebar: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
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

	const navLinks = [
		{
			name: "Portfolio",
			link: "/portfolio",
			ref: portfolioRef,
			isActive: isActive("portfolio"),
		},
		{
			name: "Blog",
			link: "/blog",
			ref: blogRef,
			isActive: isActive("blog"),
		},
		{
			name: "Author",
			link: "/author",
			ref: authorRef,
			isActive: isActive("author"),
		},
		{
			name: "Projects",
			link: "/projects",
			ref: projectsRef,
			isActive: isActive("projects"),
		},
		{
			name: "Theme",
			link: "/theme",
			ref: themeRef,
			isActive: isActive("theme"),
		},
		{
			name: "Home",
			link: "/",
			ref: homeRef,
			isActive: location.pathname === "/",
		},
	];

	const activeLinkRef = navLinks.find((link) => link.isActive && link.ref);

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
					open={open}
					onClick={toggleOpen}
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
							<ActiveIndicator activeLinkRef={activeLinkRef?.ref} />
							{navLinks.map((link) => (
								<NavLink
									key={link.name}
									active={link.isActive}
									tabIndex={open ? 0 : -1}
									to={link.link}
									ref={link.ref}
								>
									{link.name}
								</NavLink>
							))}
						</NavGroup>
						<OpenSearchButton onSearch={onSearch} />
						<Toggle
							value={activeTheme.name === "night"}
							onToggle={() => dispatch(toggleTimeOfDay())}
							label={`Theme: ${capitalize(activeTheme.name)}`}
							name="active-theme-toggle"
							dataCy="sidebar-theme-toggle"
						/>
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
