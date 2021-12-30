import * as React from "react";

import { BigParagraph, Box, Column, Paragraph, SubHeading } from "@Styles/general-components";

import ModifyTheme from "../ModifyTheme/ModifyTheme.component";
import ThemeControls from "../ThemeControls/ThemeControl.component";
import { AlertBox, Foldout } from "@Gen";
import { Toggle } from "@Input";

import { useAlternation, useMultiple } from "@Hooks";
import { toggleUseComputerPreferences } from "@Store/theme/theme.slice";
import { useAppDispatch, useAppSelector } from "@Store/hooks";

const ThemeCard: React.FC = () => {
  const themeStore = useAppSelector((root) => root.theme);
  const dispatch = useAppDispatch();
  const [selectedTheme, setSelectedTheme] = useAlternation();
  const [openMenus, toggleOpenMenus] = useMultiple(["general", "modify"]);
  const generalHeight = React.useMemo(() => {
    if (themeStore.themes.length < 5) {
      return "48rem";
    }
    const themesOverThreshold = themeStore.themes.length - 5;
    return `${48 + 6 * themesOverThreshold}rem`;
  }, [themeStore.themes]);
  return (
    <Column style={{ gap: "1rem" }}>
      {themeStore.error && (
        <AlertBox success={false}>
          {themeStore.error}
        </AlertBox>
      )}
      <>
        <Foldout
          open={openMenus["general"]}
          height={generalHeight}
          onClick={() => toggleOpenMenus("general")}
          topbar={<BigParagraph>General Options</BigParagraph>}
          cyId="theme-open-general"
        >
          <Box>
            <Paragraph>Use Computer Theme Preferences:</Paragraph>
            <Toggle
              label={themeStore.ignoreComputerPreferences ? "Off" : "On"}
              name="theme-ignore-computer-preferences"
              onToggle={() => dispatch(toggleUseComputerPreferences())}
              value={!themeStore.ignoreComputerPreferences}
              tabIndex={openMenus["general"] ? 0 : -1}
            />
          </Box>
          <ThemeControls
            open={openMenus["general"]}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        </Foldout>
      </>
      <>
        <Foldout
          height="auto"
          open={openMenus["modify"]}
          onClick={() => toggleOpenMenus("modify")}
          topbar={<BigParagraph>Modify Theme</BigParagraph>}
          cyId="theme-open-modify"
        >
          <ModifyTheme open={openMenus["modify"]} selectedTheme={selectedTheme} />
        </Foldout>
      </>
    </Column>
  );
};

export default ThemeCard;
