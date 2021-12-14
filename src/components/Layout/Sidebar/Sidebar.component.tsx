import * as React from "react";

import {
    StyledSidebar,
    NavGroup,
    ArrowButton,
    VisibleGroup,
    SidebarContents,
    LegalBox,
    LegalItem,
} from "./Sidebar.styles";

import LinkGroup from "../LinkGroup/LinkGroup.component";
import CustomLink from "@Gen/CustomLink/CustomLink.component";
import Toggle from "@Input/Toggle/Toggle.component";
import Logo from "./Logo/Logo.component";

import useDropdown from "@Hooks/useDropdown.hook";
import Search from "../Search/Search.component";

import { useAppSelector, useAppDispatch } from "@Store/hooks";
import { toggleTimeOfDay } from "@Store/theme/theme.slice";
import { capitalize } from "@Utils/strings";

const Sidebar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useDropdown();
    const [opening, setOpening] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const activeTheme = useAppSelector(state => state.theme.active);

    React.useEffect(() => {
        if (opening) {
            setTimeout(() => setOpening(false), 1000);
        }
    }, [opening]);

    const [open, setOpen] = React.useState<boolean>(false);
    function toggleOpen() {
        setOpen((state) => !state);
        setOpening(true);
    }
    function handleNavClick(e: React.BaseSyntheticEvent) {
        if (e.target.getAttribute("data-navtoggle") === "nav-toggle") {
            toggleOpen();
        }
    }

    const blogLinks: LinkItem[] = [
        "Ben's Thoughts",
        "Reviews",
        {
            name: "Podcast",
            link: "Down South Boulder Road",
        },
    ];

    const authorLinks: LinkItem[] = ["Books", "Short Stories"];

    return (
        <StyledSidebar
            className={open ? "nav-toggle-open" : "nav-toggle-close"}
            data-navtoggle="nav-toggle"
            onClick={handleNavClick}
            open={open}
        >
            <SidebarContents
                className={open ? "nav-toggle-open" : "nav-toggle-close"}
                data-navtoggle="nav-toggle"
                open={open}
            >
                <ArrowButton
                    tabIndex={0}
                    open={open}
                    onClick={toggleOpen}
                    data-cy="open-sidemenu"
                >
                    &larr;
                </ArrowButton>
                <VisibleGroup
                    className={open ? "nav-toggle-open" : "nav-toggle-close"}
                    data-navtoggle="nav-toggle"
                    aria-hidden={!open}
                    open={open}
                >
                    <NavGroup>
                        <LinkGroup
                            domain="blog"
                            links={blogLinks}
                            open={openDropdown === "blog"}
                            onClick={() => setOpenDropdown("blog")}
                            height="7rem"
                            tabIndex={openDropdown === "blog" ? 0 : -1}
                        />
                        <LinkGroup
                            domain="author"
                            links={authorLinks}
                            open={openDropdown === "author"}
                            onClick={() => setOpenDropdown("author")}
                            tabIndex={openDropdown === "author" ? 0 : -1}
                        />
                        <CustomLink
                            tabIndex={open ? 0 : -1}
                            to="/portfolio"
                            underbarSize="12rem"
                        >
                            Portfolio
                        </CustomLink>
                    </NavGroup>
                    <NavGroup>
                        <Search
                            open={openDropdown === "search"}
                            onClick={() => setOpenDropdown("search")}
                        />
                    </NavGroup>
                    <NavGroup>
                        <CustomLink
                            tabIndex={open ? 0 : -1}
                            to="/"
                            underbarSize="12rem"
                        >
                            Home
                        </CustomLink>
                        <CustomLink
                            tabIndex={open ? 0 : -1}
                            to="/contact"
                            underbarSize="12rem"
                        >
                            Contact
                        </CustomLink>
                        <CustomLink
                            tabIndex={open ? 0 : -1}
                            to="/privacy"
                            underbarSize="12rem"
                        >
                            Privacy
                        </CustomLink>
                        <CustomLink
                            tabIndex={open ? 0 : -1}
                            to="/about"
                            underbarSize="12rem"
                        >
                            About
                        </CustomLink>
                    </NavGroup>
                    <div>
                        <Toggle
                            value={activeTheme.base.name === 'night'}
                            onToggle={() => dispatch(toggleTimeOfDay())}
                            label={`Theme: ${capitalize(activeTheme.base.name)}`}
                            name="active-theme-toggle"
                            dataCy="sidebar-theme-toggle"
                        />
                    </div>
                    <LegalBox>
                        <LegalItem>&copy; 2021 by Benyakir Horowitz</LegalItem>
                        <LegalItem>All Rights Reserved</LegalItem>
                    </LegalBox>
                </VisibleGroup>
                <Logo opening={opening} open={open} />
            </SidebarContents>
        </StyledSidebar>
    );
};

export default Sidebar;
