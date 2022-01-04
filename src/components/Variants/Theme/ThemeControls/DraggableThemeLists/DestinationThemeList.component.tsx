import * as React from "react";

import { DestinationList } from "@Draggable";

import { useAppDispatch, useAppSelector } from "@Store/hooks";
import {
  setThemePreferenceByID,
  setActiveThemeByID,
  copyThemeByID,
  deleteThemeByID,
} from "@Store/theme/theme.slice";

const DestinationThemeList: React.FC<DestinationThemeListProps> = ({ selectedTheme, setSelectedTheme }) => {
  const themeStore = useAppSelector(root => root.theme);
  const dispatch = useAppDispatch();
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
  }, [themeStore.themes, themeStore.active, themeStore.prefers]);
  return <DestinationList destinations={destinations} />;
};

export default DestinationThemeList;
