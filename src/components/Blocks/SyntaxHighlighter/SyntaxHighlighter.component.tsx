import * as React from 'react'
import { PrismLight } from 'react-syntax-highlighter'

import {
  HighlighterContainer,
  HighlighterTopbar,
  LoadingBackground,
  LoadingContainer,
} from './SyntaxHighlighter.styles'

import { Loading } from '@Gen'

import {
  getPrismLanguage,
  getPrismTheme,
  decode,
  getFullLanguage,
  getFullTheme,
  ENABLED_THEMES,
} from '@Utils/blocks/syntax-highlighter'

const SyntaxHighlighter: React.FC<SyntaxHighlighterBlock> = ({
  lang,
  code,
  theme = 'darcula',
}) => {
  const [initialized, setInitialized] = React.useState<boolean>(false)
  const [finalTheme, setFinalTheme] = React.useState<any>()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [showTheme, setShowTheme] = React.useState<EnabledTheme>(theme)

  async function fetchTheme() {
    const _theme = await getPrismTheme(showTheme)
    setFinalTheme(_theme)
  }

  async function fetchLang() {
    const _lang = await getPrismLanguage(lang)
    PrismLight.registerLanguage(lang, _lang)
  }

  React.useEffect(() => {
    async function intialize() {
      await fetchLang()
      await fetchTheme()
      setLoading(false)
      setInitialized(true)
    }
    intialize()
  }, [])

  React.useEffect(() => {
    async function changeTheme() {
      setLoading(true)
      await fetchTheme()
      setLoading(false)
    }
    if (initialized) changeTheme()
  }, [showTheme])

  const randId = Math.random().toString()
  return (
    <HighlighterContainer>
      {loading && (
        <>
          <LoadingBackground />
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        </>
      )}
      <HighlighterTopbar>
        <span>Language: {getFullLanguage(lang)}</span>
        <span>
          <label htmlFor={`theme-${randId}`}>Theme: </label>
          <select
            id={`theme-${randId}`}
            value={showTheme}
            onChange={(e) => setShowTheme(e.target.value as EnabledTheme)}
          >
            {ENABLED_THEMES.map((t) => (
              <option key={t} value={t}>
                {getFullTheme(t)}
              </option>
            ))}
          </select>
        </span>
      </HighlighterTopbar>
      {finalTheme ? (
        <PrismLight tabIndex={0} language={lang} style={finalTheme}>
          {decode(code)}
        </PrismLight>
      ) : (
        <div>{decode(code)}</div>
      )}
    </HighlighterContainer>
  )
}

export default SyntaxHighlighter
