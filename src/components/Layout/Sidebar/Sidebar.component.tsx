import * as React from 'react'

import {
  StyledSidebar,
  NavGroup,
  ArrowButton,
  VisibleGroup,
  SidebarContents,
  LegalBox,
  LegalItem,
  SidebarBackdrop,
} from './Sidebar.styles'
import Logo from '../Logo/Logo.component'

import { LinkGroup } from '@Layout'
import { CustomLink } from '@Gen'
import { Toggle } from '@Input'

import { useAlternation } from '@Hooks'
import Search from '../Search/Search.component'

import { capitalize } from '@Utils/strings'

import { useAppSelector, useAppDispatch } from '@Store/hooks'
import { toggleTimeOfDay } from '@Store/theme/theme.slice'

import { authorLinks, blogLinks, generalLinks } from '@Data/links'
import {
  setSidebarState,
  toggleSidebarState,
} from '@/store/sidebar/sidebar.slice'

const Sidebar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useAlternation()
  const [opening, setOpening] = React.useState<boolean>(false)

  const dispatch = useAppDispatch()
  const open = useAppSelector((root) => root.sidebar.open)
  const activeTheme = useAppSelector((root) => root.theme.active)

  React.useEffect(() => {
    if (opening) {
      setTimeout(() => setOpening(false), 1000)
    }
  }, [opening])

  function toggleOpen() {
    dispatch(toggleSidebarState())
    setOpening(true)
  }

  function handleNavClick(e: React.BaseSyntheticEvent) {
    if (e.target.getAttribute('data-navtoggle') === 'nav-toggle') {
      toggleOpen()
    }
  }

  return (
    <>
      <SidebarBackdrop
        open={open}
        onClick={() => dispatch(setSidebarState(false))}
      />
      <StyledSidebar
        className={open ? 'nav-toggle-open' : 'nav-toggle-close'}
        data-navtoggle="nav-toggle"
        onClick={handleNavClick}
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
        <SidebarContents
          className={open ? 'nav-toggle-open' : 'nav-toggle-close'}
          data-navtoggle="nav-toggle"
          open={open}
        >
          <VisibleGroup
            className={open ? 'nav-toggle-open' : 'nav-toggle-close'}
            data-navtoggle="nav-toggle"
            aria-hidden={!open}
            open={open}
          >
            <NavGroup>
              <LinkGroup
                domain="blog"
                links={blogLinks}
                open={openDropdown === 'blog'}
                onClick={() => setOpenDropdown('blog')}
                height="7rem"
                tabIndex={openDropdown === 'blog' ? 0 : -1}
              />
              <LinkGroup
                domain="author"
                links={authorLinks}
                open={openDropdown === 'author'}
                onClick={() => setOpenDropdown('author')}
                height="7rem"
                tabIndex={openDropdown === 'author' ? 0 : -1}
              />
              <CustomLink
                tabIndex={open ? 0 : -1}
                to="/portfolio"
                underbarsize="12rem"
              >
                Portfolio
              </CustomLink>
            </NavGroup>
            <NavGroup>
              <Search
                open={openDropdown === 'search'}
                onClick={() => setOpenDropdown('search')}
              />
            </NavGroup>
            <NavGroup>
              {generalLinks.map((linkItem) => (
                <CustomLink
                  key={typeof linkItem === 'string' ? linkItem : linkItem.link}
                  tabIndex={open ? 0 : -1}
                  underbarsize="12rem"
                  to={`/${
                    typeof linkItem === 'string' ? linkItem : linkItem.link
                  }`}
                >
                  {capitalize(
                    typeof linkItem === 'string' ? linkItem : linkItem.name
                  )}
                </CustomLink>
              ))}
            </NavGroup>
            <div>
              <Toggle
                value={activeTheme.name === 'night'}
                onToggle={() => dispatch(toggleTimeOfDay())}
                label={`Theme: ${capitalize(activeTheme.name)}`}
                name="active-theme-toggle"
                dataCy="sidebar-theme-toggle"
              />
            </div>
            <LegalBox>
              <LegalItem>&copy; 2021-2023 by Benyakir Horowitz</LegalItem>
              <LegalItem>All Rights Reserved</LegalItem>
            </LegalBox>
          </VisibleGroup>
          <Logo opening={opening} open={open} />
        </SidebarContents>
      </StyledSidebar>
    </>
  )
}

export default Sidebar
