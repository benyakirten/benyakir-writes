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
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[identifier: string]: React.FC<any>;
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
