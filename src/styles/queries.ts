export const customMediaQuery = (maxWidth: number) =>
	`@media (max-width: ${maxWidth}px)`;

export const media = {
	custom: customMediaQuery,
	desktop: customMediaQuery(922),
	tablet: customMediaQuery(768),
	phone: customMediaQuery(576),
	reducedMotion: "@media (prefers-reduced-motion)",
	noHover: "@media (any-hover: none)",
};
