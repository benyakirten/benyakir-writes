import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { CardContainer, CardHalf, ThemeName } from "./ThemeControls.styles";
import { FlatBox } from "@Styles/general-components";
import { ReorderableList, DestinationList } from "@Draggable";
import { Button, IconButton } from "@Gen";

import { useAppDispatch, useAppSelector } from "@Store/hooks";
import {
  reorderThemes,
  createTheme,
  resetThemeOptions,
  setThemePreferenceByID,
  setActiveThemeByID,
  copyThemeByID,
  deleteThemeByID,
} from "@Store/theme/theme.slice";
import { DraggedOverPosition } from "@Utils/enums";

const ThemeControls: React.FC<ThemeControlProps> = ({
  selectedTheme,
  setSelectedTheme,
  open
}) => {
  // Icons all have CC0 License and sourced from svgrepo.com
  const themeQuery: ThemeIconsQuery = useStaticQuery(graphql`
    query ThemeQuery($glob: String = "theme/*") {
      allFile(
        filter: { relativePath: { glob: $glob } }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          name
          publicURL
        }
      }
    }
  `);
  const themeStore = useAppSelector((store) => store.theme);
  const themeNames = React.useMemo(
    () =>
      themeStore.themes.map((theme) => {
        const { nodes } = themeQuery.allFile;
        return {
          dragValue: theme.id,
          value: (
            <FlatBox style={{ justifyContent: "space-between" }}>
              <ThemeName>{theme.name}</ThemeName>
              <FlatBox>
                <IconButton
                  alt={nodes[0].name.slice(2)}
                  onClick={() => dispatch(setThemePreferenceByID(theme.id))}
                  iconSrc={nodes[0].publicURL}
                  name={theme.name + "-set-preference"}
                  size="2rem"
                  tabIndex={open ? 0 : -1}
                />
                <IconButton
                  alt={nodes[1].name.slice(2)}
                  onClick={() => dispatch(setActiveThemeByID(theme.id))}
                  iconSrc={nodes[1].publicURL}
                  name={theme.name + "-set-active"}
                  size="2rem"
                  tabIndex={open ? 0 : -1}
                />
                <IconButton
                  alt={nodes[2].name.slice(2)}
                  onClick={() => dispatch(copyThemeByID(theme.id))}
                  iconSrc={nodes[2].publicURL}
                  name={theme.name + "-copy"}
                  size="2rem"
                  tabIndex={open ? 0 : -1}
                />
                <IconButton
                  alt={nodes[3].name.slice(2)}
                  onClick={() => dispatch(deleteThemeByID(theme.id))}
                  iconSrc={nodes[3].publicURL}
                  name={theme.name + "-delete"}
                  size="2rem"
                  tabIndex={open ? 0 : -1}
                  disabled={theme.id === "0" || theme.id === "1"}
                />
              </FlatBox>
            </FlatBox>
          ),
        };
      }),
    [themeStore, open]
  );
  const dropHandler = React.useCallback(
    (start: string, end: string, position: DraggedOverPosition) => {
      dispatch(
        reorderThemes({
          start,
          end,
          position,
        })
      );
    },
    []
  );
  const destinations = React.useMemo(() => {
    const preferredTheme = themeStore.themes.find(
      (theme) => theme.id === themeStore.prefers
    );
    return [
      {
        title: "Preferred Theme",
        content: preferredTheme ? preferredTheme.name : "Unknown",
        onDrop: (value: string) => dispatch(setThemePreferenceByID(value)),
      },
      {
        title: "Active Theme",
        content: themeStore.active.name,
        onDrop: (value: string) => dispatch(setActiveThemeByID(value)),
      },
      {
        title: "Copy Theme",
        content: "Drag and drop theme here to create a copy of it",
        onDrop: (value: string) => dispatch(copyThemeByID(value)),
      },
      {
        title: "Delete Theme",
        content: "Drag and drop theme here to delete it",
        onDrop: (value: string) => {
          if (selectedTheme === value) {
            setSelectedTheme("");
          }
          dispatch(deleteThemeByID(value));
        },
      },
    ];
  }, [themeStore]);
  const dispatch = useAppDispatch();
  return (
    <CardContainer>
      <CardHalf>
        <ReorderableList
          cyId="all-themes-list"
          onDrop={dropHandler}
          onSelect={setSelectedTheme}
          selectedItem={selectedTheme}
          items={themeNames}
        />
        <Button tabIndex={open ? 0 : -1} onClick={() => dispatch(createTheme())}>
          Create New Theme
        </Button>
        <Button tabIndex={open ? 0 : -1} onClick={() => dispatch(resetThemeOptions())}>Reset</Button>
      </CardHalf>
      <CardHalf>
        <DestinationList destinations={destinations} />
      </CardHalf>
    </CardContainer>
  );
};

export default ThemeControls;
