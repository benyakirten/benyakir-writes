import { useLocation } from '@reach/router'
import * as React from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, LayoutContainer, MainContainer } from './Layout.styles'
import Sidebar from './Sidebar/Sidebar.component'

import {
  getPageTransitionStyles,
  PAGE_TRANSITION_DURATION,
} from '@/styles/transitions'
import { useAppDispatch, useAppSelector } from '@Store/hooks'
import {
  intializeThemeStore,
  setActiveThemeByName,
} from '@Store/theme/theme.slice'

export const Head: React.FC = () => (
  <>
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
  </>
)

const Layout: React.FC<ChildrenProp> = ({ children }) => {
  const location = useLocation()
  const themeStore = useAppSelector((root) => root.theme)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const storedComputerPreferences = localStorage.getItem('BWB_ICP') === 'true'
    let storedThemes = localStorage.getItem('BWB_TS')
    const storedPreference = localStorage.getItem('BWB_TNP')?.replace(/"/g, '')

    dispatch(
      intializeThemeStore({
        computerPreferences: storedComputerPreferences,
        themes: storedThemes,
        preference: storedPreference,
      })
    )

    if (window && window.matchMedia) {
      const darkColorScheme = window.matchMedia('(prefers-color-scheme: dark)')

      const setThemeByPreference = (e: MediaQueryList) => {
        if (!storedComputerPreferences) {
          dispatch(setActiveThemeByName(e.matches ? 'night' : 'day'))
        }
      }

      const themePreferenceChange = (e: any) => setThemeByPreference(e.target)
      darkColorScheme.addEventListener('change', themePreferenceChange)
      setThemeByPreference(darkColorScheme)
      return () =>
        darkColorScheme.removeEventListener('change', themePreferenceChange)
    }
  }, [])

  return (
    <ThemeProvider theme={themeStore.active}>
      <LayoutContainer>
        <GlobalStyles />
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
  )
}

export default Layout
