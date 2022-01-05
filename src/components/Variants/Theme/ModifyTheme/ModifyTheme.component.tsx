import * as React from "react";

import {
  BigParagraph,
  Box,
  Column,
  Paragraph,
} from "@Styles/general-components";
import { ControlsContainer, ThemeAppearance } from "./ModifyTheme.styles";
import SettingsGroup from "./SettingsGroup.component";
import { Text } from "@Input";

import { useMultiple } from "@Hooks";
import { useAppSelector, useAppDispatch } from "@Store/hooks";
import { changeThemeName, flattenedThemeShape } from "@Store/theme/theme.slice";
import { capitalize } from "@Utils/strings";

const ModifyTheme: React.FC<ModifyThemeProps> = ({ selectedTheme, open }) => {
  const dispatch = useAppDispatch();
  const themes = useAppSelector(root => root.theme.themes);
  const theme = React.useMemo(
    () => themes.find((theme) => theme.id === selectedTheme),
    [selectedTheme, themes]
  );
  const groupNames = React.useMemo(
    () => flattenedThemeShape.map((groups) => groups[0][0]),
    [flattenedThemeShape]
  );
  const [openGroups, toggleOpenGroups] = useMultiple(groupNames, []);

  return (
    <ControlsContainer>
      {theme ? (
        <ThemeAppearance>
          <BigParagraph>Change the properties of {theme.name}:</BigParagraph>
          <Box>
            <Paragraph>Name:</Paragraph>
            <Text
              value={theme.name}
              tabIndex={open ? 0 : -1}
              onChange={(e) =>
                dispatch(
                  changeThemeName({
                    id: theme!.id,
                    newVal: e,
                  })
                )
              }
              name="theme-name-change"
              label="Name"
            />
          </Box>
          <Column style={{ gap: "1rem" }}>
            {flattenedThemeShape.map((group) => {
              const groupName = group[0][0];
              return (
                <SettingsGroup
                  key={groupName}
                  preface={groupName}
                  theme={theme}
                  controls={group}
                  title={capitalize(groupName)}
                  open={openGroups[groupName]}
                  onOpen={() => toggleOpenGroups(groupName)}
                />
              );
            })}
          </Column>
        </ThemeAppearance>
      ) : (
        <BigParagraph>Select a theme to modify it here</BigParagraph>
      )}
    </ControlsContainer>
  );
};

export default ModifyTheme;
