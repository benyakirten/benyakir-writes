import * as React from "react";

import { CardContainer, CardHalf } from "./ThemeControls.styles";
import { Button } from "@Gen";
import DraggableThemeList from "./DraggableThemeLists/DraggableThemeList.component";
import DestinationThemeList from "./DraggableThemeLists/DestinationThemeList.component";

import { useAppDispatch } from "@Store/hooks";
import {
  createTheme,
  resetThemeOptions,
} from "@Store/theme/theme.slice";

const ThemeControls: React.FC<ThemeControlProps> = ({
  selectedTheme,
  setSelectedTheme,
  open
}) => {
  const dispatch = useAppDispatch();
  return (
    <CardContainer>
      <CardHalf>
        <DraggableThemeList open={open} onSelect={setSelectedTheme} selectedTheme={selectedTheme} />
        <Button tabIndex={open ? 0 : -1} onClick={() => dispatch(createTheme())}>
          Create New Theme
        </Button>
        <Button tabIndex={open ? 0 : -1} onClick={() => dispatch(resetThemeOptions())}>Reset</Button>
      </CardHalf>
      <CardHalf>
       <DestinationThemeList selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
      </CardHalf>
    </CardContainer>
  );
};

export default ThemeControls;
