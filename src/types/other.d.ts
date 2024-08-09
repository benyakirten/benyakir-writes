import { DefaultTheme } from "styled-components/native";

declare module "*.png";
declare module "*.svg";
declare module "*.json";
declare module "*.ttf";
declare module "*.js";
declare module "*.css" {
	const classNames: Record<string, string>;
	export = classNames;
}

// https://styled-components.com/docs/api#typescript
declare module "styled-components" {
	export type DefaultTheme = BaseTheme;
}
