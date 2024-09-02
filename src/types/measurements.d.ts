type CSSMeasure = {
	value: number;
	unit: CSSUnit;
};

type RangeLimits = {
	min: number;
	max: number;
	step: number;
};

type CSSUnit =
	| "rem"
	| "em"
	| "ex"
	| "ch"
	| "%"
	| "vw"
	| "vh"
	| "vmin"
	| "vmax"
	| "cm"
	| "mm"
	| "in"
	| "px"
	| "pt"
	| "pc";
