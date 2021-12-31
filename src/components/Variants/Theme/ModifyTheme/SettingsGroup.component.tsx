import * as React from "react";

import { BigParagraph, MinorHeading } from "@Styles/general-components";
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
      topbar={<BigParagraph>{title}</BigParagraph>}
      open={open}
      height="auto"
    >
      {controls.map((control) => {
        const name = control.join("-");
        const label = titleCase(control.slice(1));
        return (
          <ColorPicker
            key={`${preface}-${name}`}
            tabIndex={open ? 0 : -1}
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
