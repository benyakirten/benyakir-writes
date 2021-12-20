import * as React from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { ThemeProvider } from "styled-components"
import { TransitionGroup, Transition } from "react-transition-group"

import { GlobalStyles, LayoutContainer, MainContainer } from "./Layout.styles"
import Sidebar from "./Sidebar/Sidebar.component"

import { getTransitionStyles, TIMEOUT_500 } from "@Styles/page-transitions"
import { useAppDispatch, useAppSelector } from "@Store/hooks"
import { setThemeByName, intializeThemeStore } from "@Store/theme/theme.slice"

const Layout: React.FC = ({ children }) => {
  const location = useLocation()
  const themeStore = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const storedComputerPreferences = localStorage.getItem('BWB_ICP') === 'true'
    let storedThemes = localStorage.getItem('BWB_TS')
    const storedPreference = localStorage.getItem('BWB_TNP')
    dispatch(intializeThemeStore({
      computerPreferences: storedComputerPreferences,
      themes: storedThemes,
      preference: storedPreference
    }))

    if (window && window.matchMedia) {
      const darkColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  
      const setThemeByPreference = (e: MediaQueryList) => {
        if (!(storedComputerPreferences)) {
          dispatch(setThemeByName(e.matches ? 'night' : 'day'))
        }
      }
  
      const themePreferenceChange = (e: any) => setThemeByPreference(e.target)
      darkColorScheme.addEventListener('change', themePreferenceChange)
      setThemeByPreference(darkColorScheme)
      return () => darkColorScheme.removeEventListener('change', themePreferenceChange)
    }
  }, [])

  return (
    <ThemeProvider theme={themeStore.active}>
      <LayoutContainer>
        <Helmet>
          <html lang="en" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Faustina&family=Mulish&display=swap"
            rel="stylesheet"
          />
          <title>Benyakir Writes</title>
          <meta
            name="description"
            content="Benyakir Writes is my blog, an outlet for my latest works. Learn about the latest books, projects and short stories he's written.
                    Or check out his blog posts, reviews of books or podcast episodes.."
          />
        </Helmet>
        <GlobalStyles />
        <Sidebar />
        <MainContainer>
          <TransitionGroup>
            <Transition
              key={location.pathname}
              timeout={{
                enter: TIMEOUT_500,
                exit: TIMEOUT_500,
              }}
              unmountOnExit
            >
              {(status) => (
                <div
                  style={{
                    ...getTransitionStyles(TIMEOUT_500)[status],
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
  )
}

export default Layout
