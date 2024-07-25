const React = require("react");
const gatsby = vi.requireActual("gatsby");

module.exports = {
	...gatsby,
	graphql: vi.fn(),
	Link: jest
		.fn()
		.mockImplementation(
			({
				activeClassName,
				activeStyle,
				getProps,
				innerRef,
				partiallyActive,
				ref,
				replace,
				to,
				...rest
			}) =>
				React.createElement("a", {
					...rest,
					href: to,
				}),
		),
	Slice: vi.fn().mockImplementation(({ alias, ...rest }) =>
		React.createElement("div", {
			...rest,
			"data-test-slice-alias": alias,
		}),
	),
	StaticQuery: vi.fn(),
	useStaticQuery: vi.fn(),
	navigate: vi.fn(),
};
