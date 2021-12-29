import * as React from "react";

import { MinorHeading } from "@Styles/general-components";
import { Foldout } from "@Gen";
import { ColorPicker } from "@Input";

import { titleCase } from "@Utils/strings";
import { getThemeProp } from "@Utils/other";

import { useAppDispatch } from "@Store/hooks";
import { changePropOnTheme } from "@Store/theme/theme.slice";

const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  preface,
  controls,
  open,
  onOpen,
  theme,
}) => {
  const dispatch = useAppDispatch();
  return (
    <Foldout
      onClick={onOpen}
      topbar={<MinorHeading>{title}</MinorHeading>}
      open={open}
      height="auto"
    >
      {controls.map((control) => {
        const name = control.slice(1).join("-");
        const label = titleCase(control.slice(1));
        return (
          <ColorPicker
            key={`${preface}-${name}`}
            label={label}
            name={name}
            value={getThemeProp(theme, control)}
            onChange={(e) =>
              dispatch(
                changePropOnTheme({ id: theme.id, props: control, newVal: e })
              )
            }
          />
        );
      })}
    </Foldout>
  );
};

export default SettingsGroup;
