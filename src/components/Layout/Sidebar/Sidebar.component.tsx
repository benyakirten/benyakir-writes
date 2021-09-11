import * as React from "react";

import {
    StyledSidebar,
    NavGroup,
    LegalBox,
    ArrowButton,
    VisibleGroup,
    SidebarContents,
} from "./Sidebar.styles";

import LinkGroup from "../LinkGroup/LinkGroup.component";
import CustomLink from "@Gen/CustomLink/CustomLink.component";
import Logo from "./Logo/Logo.component";

import useDropdown from "@Hooks/useDropdown";
// I'm disabling the search functionality for now because it's incredibly resource intensive
// Once I think of how to do it better, I will.
import Search from "../Search/Search.component";

const Sidebar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useDropdown();

    const [opening, setOpening] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (opening) {
            setTimeout(() => setOpening(false), 1000);
        }
    }, [opening]);

    const [open, setOpen] = React.useState<boolean>(false);
    function toggleOpen(e: React.BaseSyntheticEvent) {
        if (e.target.tagName === "A") return;
        setOpen((state) => !state);
        setOpening(true);
    }
    function handleNavClick(e: React.BaseSyntheticEvent) {
        if (e.target.id === "nav-toggle") {
            toggleOpen(e);
        }
    }

    const blogLinks = ["Ben's Thoughts", "Reviews", "Down South Boulder Road"];
    const authorLinks = ["Books", "Short Stories"];

    return (
        <StyledSidebar
            className={open ? "nav-toggle-open" : "nav-toggle-close"}
            id="nav-toggle"
            onClick={handleNavClick}
            open={open}
        >
            <SidebarContents
                className={open ? "nav-toggle-open" : "nav-toggle-close"}
                id="nav-toggle"
            >
                <ArrowButton tabIndex={0} open={open} onClick={toggleOpen}>
                    &larr;
                </ArrowButton>
                <VisibleGroup
                    className={open ? "nav-toggle-open" : "nav-toggle-close"}
                    id="nav-toggle"
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
                            tabIndex={open ? 0 : -1}
                        />
                        <LinkGroup
                            domain="author"
                            links={authorLinks}
                            open={openDropdown === "author"}
                            onClick={() => setOpenDropdown("author")}
                            tabIndex={open ? 0 : -1}
                        />
                        <CustomLink to="/portfolio" underbarSize="12rem">Portfolio</CustomLink>
                    </NavGroup>
                    <NavGroup>
                        <Search
                            open={openDropdown === "search"}
                            onClick={() => setOpenDropdown("search")}
                        />
                    </NavGroup>
                    <NavGroup>
                        <CustomLink to="/" underbarSize="12rem">Home</CustomLink>
                        <CustomLink to="/contact" underbarSize="12rem">Contact</CustomLink>
                        <CustomLink to="/privacy" underbarSize="12rem">Privacy</CustomLink>
                        <CustomLink to="/about" underbarSize="12rem">About</CustomLink>
                    </NavGroup>
                </VisibleGroup>
                <NavGroup>
                    <LegalBox open={open}>
                        <div>&copy; 2021 by Benyakir Horowitz.</div>
                        <div>All Rights Reserved.</div>
                    </LegalBox>
                    <Logo opening={opening} />
                </NavGroup>
            </SidebarContents>
        </StyledSidebar>
    );
};

export default Sidebar;
