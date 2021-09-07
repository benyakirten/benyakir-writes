import * as React from "react"

import {
    StyledSidebar,
    NavGroup,
    LegalBox,
    ArrowButton,
    VisibleGroup,
    SidebarContents,
} from "./Sidebar.styles"

import LinkGroup from "../LinkGroup/LinkGroup.component"
import CustomLink from "@Gen/CustomLink/CustomLink.component"
import Logo from './Logo/Logo.component'

import useDropdown from "@Hooks/useDropdown"

// TODO: Create global search logic - query all objects, generate metas, then track titles, type (project, blog post, book, story) and slugs

const Sidebar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useDropdown()
    
    const [opening, setOpening] = React.useState<boolean>(false)
    React.useEffect(() => {
        if (opening) {
            setTimeout(() => setOpening(false), 1000)
        }
    }, [opening])

    const [open, setOpen] = React.useState<boolean>(false)
    function toggleOpen(e: React.BaseSyntheticEvent) {
        if (e.target.tagName === "A") return
        setOpen((state) => !state)
        setOpening(true)
    }
    function handleNavClick(e: React.BaseSyntheticEvent) {
        if (e.target.id === "nav-toggle") {
            toggleOpen(e)
        }
    }

    const blogLinks = [
        "Ben's Thoughts",
        "Reviews",
        "Down South Boulder Road",
    ]
    const authorLinks = ["Books", "Short Stories"]

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
                        />
                        <LinkGroup
                            domain="author"
                            links={authorLinks}
                            open={openDropdown === "author"}
                            onClick={() => setOpenDropdown("author")}
                        />
                        <CustomLink to="/portfolio">Portfolio</CustomLink>
                    </NavGroup>
                    <NavGroup>
                        <CustomLink to="/">Home</CustomLink>
                        <CustomLink
                            outside
                            to="https://benyakiredits.com/about-me/contact/"
                        >
                            Contact
                        </CustomLink>
                        <CustomLink to="/privacy">Privacy</CustomLink>
                        <CustomLink to="/about">About</CustomLink>
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
    )
}

export default Sidebar
