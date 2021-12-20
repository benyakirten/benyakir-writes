import * as React from "react";
import { Helmet } from "react-helmet";

import {
  LeadHeading,
  Grouping,
  SubHeading,
  Paragraph,
  Box,
} from "@Styles/general-components";
import Toggle from "@Input/Toggle/Toggle.component";
import ThemeCard from "@Variant/Cards/ThemeCard/ThemeCard.component";

import { useAppDispatch, useAppSelector } from "@Store/hooks";
import { toggleUseComputerPreferences } from "@Store/theme/theme.slice";

const Theme: React.FC = () => {
  const themeStore = useAppSelector((store) => store.theme)
  const dispatch = useAppDispatch();
  return (
    <>
      <Helmet>
        <title>Benyakir Writes - Themes</title>
        <meta
          name="description"
          content="Visitors can set a color theme or customize their own.
            Optionally, they can save anything local storage and set it as the default."
        />
      </Helmet>
      <LeadHeading>Themes and Customization</LeadHeading>
      <Grouping>
        <SubHeading>General Options</SubHeading>
        <Paragraph>This is a work in progress. I have added this page because I realized I needed to make some UI updates, and I hadn't yet finished with this.</Paragraph>
        <Box>
          <Paragraph>Use Computer Theme Preferences:</Paragraph>
          <Toggle
            label={themeStore.ignoreComputerPreferences ? "Off" : "On"}
            name="theme-ignore-computer-preferences"
            onToggle={() => dispatch(toggleUseComputerPreferences())}
            value={!themeStore.ignoreComputerPreferences}
          />
        </Box>
        <ThemeCard />
      </Grouping>
    </>
  );
};

export default Theme;
