import * as React from "react";
import { Helmet } from "react-helmet";

import Toggle from "@Input/Toggle/Toggle.component";
import useToggle from "@/hooks/useToggle.hook";

const Theme: React.FC = () => {
  const [toggle, toggleToggle] = useToggle();
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
      <div>
        If you're here, you probably have seen the source code. This is a
        temporary page until I work out some things. Basically, if this was the
        90s, you'd see little construction people on a yellow sign saying "work
        in progress".
        <Toggle
          value={toggle}
          onToggle={toggleToggle}
          label={toggle ? "night" : "day"}
          name="temp"
        />
      </div>
    </>
  );
};

export default Theme;
