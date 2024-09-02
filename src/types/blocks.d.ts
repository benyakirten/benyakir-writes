type BaseBlock = {
	type: string;
	content?: string;
};

type DefaultBlock = BaseBlock & {
	type: "default";
	content: string;
};

type SyntaxHighlighterBlock = BaseBlock & {
	lang: EnabledLanguage;
	theme?: EnabledTheme;
	code: string;
};

type BlockComponents = {
	[identifier: string]: {
		// biome-ignore lint/suspicious/noExplicitAny: Typing this would be a pain.
		el: React.FC<any>;
		// biome-ignore lint/suspicious/noExplicitAny: Typing this would be a pain.
		propGetter: (content: string) => any;
	};
};

type EncodingFunction = (code: string) => string;

type EnabledTheme =
	| "darcula"
	| "prism"
	| "atomDark"
	| "materialDark"
	| "duotoneSpace"
	| "duotoneLight";
type EnabledLanguage =
	| "js"
	| "jsx"
	| "ts"
	| "tsx"
	| "python"
	| "php"
	| "graphql"
	| "css"
	| "scss"
	| "erlang"
	| "elixir"
	| "go";

type DecodeTheme = (theme: EnabledTheme) => string;
type DecodeLanguage = (theme: EnabledLanguage) => string;
