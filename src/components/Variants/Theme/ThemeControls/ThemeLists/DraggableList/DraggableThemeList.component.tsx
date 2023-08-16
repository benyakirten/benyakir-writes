import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { ReorderableList } from '@Draggable'
import DraggableTheme from './DraggableTheme/DraggableTheme.component'

import { useAppSelector, useAppDispatch } from '@Store/hooks'
import { reorderThemes } from '@Store/theme/theme.slice'
import { DraggedOverPosition } from '@Utils/enums'

const DraggableThemeList: React.FC<DraggableThemeListProps> = ({
  open,
  onSelect,
  selectedTheme,
}) => {
  // Icons sourced from svgrepo.com and all have CC0 License
  const themeQuery: ThemeIconsQuery = useStaticQuery(graphql`
    query ThemeQuery($glob: String = "theme/*") {
      allFile(filter: { relativePath: { glob: $glob } }, sort: { name: ASC }) {
        nodes {
          name
          publicURL
        }
      }
    }
  `)

  const themeStore = useAppSelector((root) => root.theme)
  const dispatch = useAppDispatch()
  const themeNames = React.useMemo(
    () =>
      themeStore.themes.map((theme) => {
        const { nodes } = themeQuery.allFile
        return {
          dragValue: theme.id,
          value: (
            <DraggableTheme
              nodes={nodes}
              themeId={theme.id}
              themeName={theme.name}
              open={open}
            />
          ),
        }
      }),
    [themeStore, open]
  )

  const dropHandler = React.useCallback(
    (start: string, end: string, position: DraggedOverPosition) => {
      dispatch(
        reorderThemes({
          start,
          end,
          position,
        })
      )
    },
    []
  )

  return (
    <ReorderableList
      cyId="all-themes-list"
      onDrop={dropHandler}
      onSelect={onSelect}
      selectedItem={selectedTheme}
      items={themeNames}
    />
  )
}

export default DraggableThemeList
