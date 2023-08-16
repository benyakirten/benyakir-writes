import * as React from 'react'

import { FlatBox } from '@Styles/general-components'
import { ThemeName } from './DraggableTheme.styles'
import { IconButton } from '@Gen'

import { useAppDispatch } from '@Store/hooks'
import {
  setThemePreferenceByID,
  setActiveThemeByID,
  copyThemeByID,
  deleteThemeByID,
} from '@Store/theme/theme.slice'

const DraggableTheme: React.FC<DraggableThemeProps> = ({
  open,
  nodes,
  themeId,
  themeName,
}) => {
  const dispatch = useAppDispatch()
  return (
    <FlatBox style={{ justifyContent: 'space-between' }}>
      <ThemeName>{themeName}</ThemeName>
      <FlatBox>
        <IconButton
          alt={nodes[0].name.slice(2)}
          onClick={() => dispatch(setThemePreferenceByID(themeId))}
          iconSrc={nodes[0].publicURL}
          name={themeName + '-set-preference'}
          size="2rem"
          tabIndex={open ? 0 : -1}
        />
        <IconButton
          alt={nodes[1].name.slice(2)}
          onClick={() => dispatch(setActiveThemeByID(themeId))}
          iconSrc={nodes[1].publicURL}
          name={themeName + '-set-active'}
          size="2rem"
          tabIndex={open ? 0 : -1}
        />
        <IconButton
          alt={nodes[2].name.slice(2)}
          onClick={() => dispatch(copyThemeByID(themeId))}
          iconSrc={nodes[2].publicURL}
          name={themeName + '-copy'}
          size="2rem"
          tabIndex={open ? 0 : -1}
        />
        <IconButton
          alt={nodes[3].name.slice(2)}
          onClick={() => dispatch(deleteThemeByID(themeId))}
          iconSrc={nodes[3].publicURL}
          name={themeName + '-delete'}
          size="2rem"
          tabIndex={open ? 0 : -1}
          disabled={themeId === '0' || themeId === '1'}
        />
      </FlatBox>
    </FlatBox>
  )
}

export default DraggableTheme
