export const mediaQuery = (maxWidth: number) => `(max-width: ${maxWidth}px)`;

export const DESKTOP_QUERY = mediaQuery(922);
export const TABLET_QUERY = mediaQuery(768);
export const PHONE_QUERY = mediaQuery(576);
export const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

export const media = {
  desktop: `@media ${DESKTOP_QUERY}`,
  tablet: `@media ${TABLET_QUERY}`,
  phone: `@media ${PHONE_QUERY}`,
  reducedMotion: "@media (prefers-reduced-motion)",
  noHover: "@media (any-hover: none)",
};
