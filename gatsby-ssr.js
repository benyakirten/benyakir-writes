import React from "react";

export { wrapPageElement, wrapRootElement } from "./wrapPageElement";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Faustina-VariableFont_wght.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="faustina"
    />,
    <link
      rel="preload"
      href="/fonts/Mulish-VariableFont_wght.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="mulish"
    />,
  ]);
};
