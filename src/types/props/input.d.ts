type InputProps = {
	label: string;
	name: string;
	tabIndex?: number;
};

type TextProps = InputProps & {
	value: string;
	onChange: (newText: string) => void;
	width?: string;
	cyId?: string;
};

type CheckboxProps = InputProps & {
	value: boolean;
	onToggle: (newState: boolean) => void;
};

type DateProps = InputProps & {
	value: Date;
	onChange: (date: Date) => void;
};

type ChoiceProps = {
	tabIndex?: number;
	label: string;
	value: boolean;
	onSelect: (label: string) => void;
};

type MultipleChoiceProps = {
	tabIndex?: number;
	choices: PotentialChoice[];
	onSelect: (choices: PotentialChoice[]) => void;
};

type ToggleProps = InputProps & {
	value: boolean;
	onToggle: () => void;
	dataCy?: string;
};

type ColorPickerProps = InputProps & {
	value: string;
	onChange: (newVal: string) => void;
};
