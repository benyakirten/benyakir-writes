import * as React from "react";

import { CardContainer, CardHalf } from "./ThemeControls.styles";
import { ReorderableList, DestinationList } from "@Draggable";
import { Button } from "@Gen";

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
}) => {
  const themeStore = useAppSelector((store) => store.theme);
  const themeNames = React.useMemo(
    () =>
      themeStore.themes.map((theme) => ({
        dragValue: theme.id,
        value: theme.name,
      })),
    [themeStore]
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
          onDrop={dropHandler}
          onSelect={setSelectedTheme}
          selectedItem={selectedTheme}
          items={themeNames}
        />
        <Button onClick={() => dispatch(createTheme())}>
          Create New Theme
        </Button>
        <Button onClick={() => dispatch(resetThemeOptions())}>Reset</Button>
      </CardHalf>
      <CardHalf>
        <DestinationList destinations={destinations} />
      </CardHalf>
    </CardContainer>
  );
};

export default ThemeControls;
