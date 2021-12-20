import * as React from "react";

import { Column } from "@Styles/general-components";
import { CardContainer, CardHalf } from "./Themecard.styles";
import DraggableDestinationList from "@Input/Draggable/Destination/DestinationList/DestinationList.component"
import ReorderableList from "@Input/Draggable/Reorderable/ReorderableList/ReorderableList.component"

import { useAppDispatch, useAppSelector } from "@Store/hooks";
import { copyThemeByIndex, deleteThemeByIndex, reorderThemes, setThemeByIndex, setThemePreferenceByIndex } from "@Store/theme/theme.slice";
import { DraggedOverPosition } from "@Utils/enums";

const ThemeCard: React.FC = () => {
  const themeStore = useAppSelector((store) => store.theme);
  const themeNames = themeStore.themes.map((theme) => theme.base.name);
  const dropHandler = (
    start: number,
    end: number,
    position: DraggedOverPosition
  ) => {
    dispatch(
      reorderThemes({
        start,
        end,
        position,
      })
    );
  };
  const destinations = [
    {
      title: "Preferred Theme",
      content: themeStore.prefers,
      onDrop: (index: number) => dispatch(setThemePreferenceByIndex(index))
    },
    {
      title: "Active Theme",
      content: themeStore.active.base.name,
      onDrop: (index: number) => dispatch(setThemeByIndex(index))
    },
    {
      title: "Copy Theme",
      content: "Drag and drop theme here to create a copy of it",
      onDrop: (index: number) => dispatch(copyThemeByIndex(index))
    },
    {
      title: "Delete Theme",
      content: "Drag and drop theme here to delete it",
      onDrop: (index: number) => dispatch(deleteThemeByIndex(index))
    }
  ];
  const dispatch = useAppDispatch();
  return (
    <Column>
      <CardContainer>
        <CardHalf>
          <ReorderableList onDrop={dropHandler} items={themeNames} title="Themes" />
        </CardHalf>
        <CardHalf>
          <DraggableDestinationList
            title="Theme Options"
            destinations={destinations}
          />
        </CardHalf>
      </CardContainer>
    </Column>
  );
};

export default ThemeCard;
