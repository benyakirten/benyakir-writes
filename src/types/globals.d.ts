declare module "*.png";
declare module "*.svg";
declare module "*.json";
declare module "*.ttf";
declare module "*.js";
declare module "*.css" {
	const classNames: Record<string, string>;
	export = classNames;
}

import "styled-components";
// https://styled-components.com/docs/api#typescript
// Dunno why this isn't working, but I'm not going to investigate.
declare module "styled-components" {
	export type DefaultTheme = BaseTheme;
}
