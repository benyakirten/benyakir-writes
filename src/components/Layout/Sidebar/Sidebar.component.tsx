import { useLocation } from "@reach/router";
import * as React from "react";
import styled from "styled-components";

import { NextIcon, SearchIcon, ShortcutsIcon } from "@/components/Icons";
import { Toggle } from "@/components/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	setSidebarState,
	toggleSidebarState,
} from "@/store/sidebar/sidebar.slice";
import { toggleTimeOfDay } from "@/store/theme/theme.slice";
import { capitalize } from "@/utils/strings";
import {
	ArrowButton,
	LegalBox,
	LegalItem,
	LinkGroup,
	NavGroup,
	SidebarBackdrop,
	SidebarContents,
	StyledSidebar,
} from "./Sidebar.styles";
import { ActiveIndicator, NavLink } from "./components";
import Logo from "./components/Logo.component";
import OpenModalButton from "./components/OpenModalButton.component";
import { SIZE_SM } from "@/styles/variables";

const IconButtonColumn = styled.div`
	display: grid;
	gap: ${SIZE_SM};
`;

const Sidebar: React.FC<{
	onSearch: () => void;
	onOpenShortcuts: () => void;
}> = ({ onSearch, onOpenShortcuts }) => {
	const portfolioRef = React.useRef<HTMLElement>(null);
	const blogRef = React.useRef<HTMLElement>(null);
	const authorRef = React.useRef<HTMLElement>(null);
	const projectsRef = React.useRef<HTMLElement>(null);
	const themeRef = React.useRef<HTMLElement>(null);
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
					<NextIcon />
				</ArrowButton>
				<SidebarContents
					className={open ? "nav-toggle-open" : "nav-toggle-close"}
					data-navtoggle="nav-toggle"
					open={open}
				>
					<LinkGroup
						className={open ? "nav-toggle-open" : "nav-toggle-close"}
						data-navtoggle="nav-toggle"
						aria-hidden={!open}
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
						<IconButtonColumn>
							<OpenModalButton onClick={onSearch} icon={<SearchIcon />}>
								Search
							</OpenModalButton>
							<OpenModalButton
								onClick={onOpenShortcuts}
								icon={<ShortcutsIcon />}
							>
								Shortcuts
							</OpenModalButton>
						</IconButtonColumn>
						<Toggle
							value={activeTheme.id === "1"}
							onToggle={() => dispatch(toggleTimeOfDay())}
							label={`Theme: ${capitalize(activeTheme.name)}`}
							name="active-theme-toggle"
							dataCy="sidebar-theme-toggle"
						/>
						<LegalBox>
							<LegalItem>&copy; 2021-2024 by Benyakir Horowitz</LegalItem>
							<LegalItem>All Rights Reserved</LegalItem>
						</LegalBox>
					</LinkGroup>
				</SidebarContents>
				<Logo opening={opening} open={open} />
			</StyledSidebar>
		</>
	);
};

export default Sidebar;
