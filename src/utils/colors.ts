import { keepWithinRange } from "./numbers";
import { validateRange } from "./validation";

export function convertHexToRGBA(color: string, opacity = 0.4) {
	const parsedColors = convertHexToRGBNumber(color);
	return `rgba(${parsedColors.red}, ${parsedColors.green}, ${
		parsedColors.blue
	}, ${+opacity.toFixed(2)})`;
}

function parseAndCheck(..._colors: string[]) {
	const parsedColors = _colors.map((c) => Number.parseInt(c, 16));
	for (const parsedColor of parsedColors) {
		if (Number.isNaN(parsedColor) || parsedColor < 0 || parsedColor > 255) {
			throw new Error("Hex string is unable to be parsed as a color");
		}
	}
	return parsedColors;
}

function checkIfHexValid(color: string) {
	if (color[0] !== "#" || !(color.length === 4 || color.length === 7)) {
		throw new Error(
			"Hex string must consist of # followed by three or six numbers",
		);
	}
}

export function convertHexToRGBString(color: string): RGBString {
	checkIfHexValid(color);
	let red = "";
	let green = "";
	let blue = "";

	if (color.length === 4) {
		red = `${color[1]}${color[1]}`;
		green = `${color[2]}${color[2]}`;
		blue = `${color[3]}${color[3]}`;
	} else if (color.length === 7) {
		red = color.slice(1, 3);
		green = color.slice(3, 5);
		blue = color.slice(5, 7);
	}

	parseAndCheck(red, blue, green);

	return {
		red,
		green,
		blue,
	};
}

export function convertRGBStringToRGBNumber(color: RGBString): RGBNumber {
	const red = Number.parseInt(color.red, 16);
	const green = Number.parseInt(color.green, 16);
	const blue = Number.parseInt(color.blue, 16);
	if (
		Number.isNaN(red) ||
		Number.isNaN(green) ||
		Number.isNaN(blue) ||
		red > 255 ||
		red < 0 ||
		blue > 255 ||
		blue < 0 ||
		green > 255 ||
		green < 0
	) {
		throw new Error("RGB Color String cannot be parsed");
	}
	return {
		red,
		green,
		blue,
	};
}

export function convertRGBNumberToRGBString(color: RGBNumber): RGBString {
	const { red, green, blue } = color;
	if (!validateRGBNumbers(red, blue, green)) {
		throw new Error("Unable to validate color values");
	}
	function getValues(...colors: number[]) {
		const finalColors = [];
		for (const color of colors) {
			let colorVal = color.toString(16);
			colorVal = colorVal.length === 1 ? colorVal + colorVal : colorVal;
			finalColors.push(colorVal);
		}
		return finalColors;
	}
	const [redVal, greenVal, blueVal] = getValues(red, green, blue);

	return {
		red: redVal,
		green: greenVal,
		blue: blueVal,
	};
}

export function validateRGBNumbers(...colors: number[]) {
	if (colors.length === 0) return false;
	const validateRGB = validateRange({ min: 0, max: 255, step: 1 });
	for (const color of colors) {
		if (!validateRGB(color)) {
			return false;
		}
	}
	return true;
}

// TODO: Combine convertHexToRGBString and this function
export function convertHexToRGBNumber(color: string): RGBNumber {
	checkIfHexValid(color);
	let red = "";
	let green = "";
	let blue = "";

	if (color.length === 4) {
		red = `${color[1]}${color[1]}`;
		green = `${color[2]}${color[2]}`;
		blue = `${color[3]}${color[3]}`;
	} else if (color.length === 7) {
		red = color.slice(1, 3);
		green = color.slice(3, 5);
		blue = color.slice(5, 7);
	}

	const [parsedRed, parsedGreen, parsedBlue] = parseAndCheck(red, green, blue);
	return {
		red: parsedRed,
		green: parsedGreen,
		blue: parsedBlue,
	};
}

export function convertRGBNumberToHex(color: RGBNumber): string {
	const { red, green, blue } = color;
	if (!validateRGBNumbers(red, blue, green)) {
		throw new Error("Unable to validate color values");
	}
	return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

export function changeHex(
	color: string,
	percent: number,
	positive = true,
): string {
	checkIfHexValid(color);
	const convertedColor = convertHexToRGBNumber(color);
	const changeAmount = Math.round(keepWithinRange((255 * percent) / 100));
	if (positive) {
		const changedRGB: RGBNumber = {
			red: keepWithinRange(convertedColor.red + changeAmount),
			green: keepWithinRange(convertedColor.blue + changeAmount),
			blue: keepWithinRange(convertedColor.green + changeAmount),
		};
		return convertRGBNumberToHex(changedRGB);
	}
	const changedRGB: RGBNumber = {
		red: keepWithinRange(convertedColor.red - changeAmount),
		green: keepWithinRange(convertedColor.blue - changeAmount),
		blue: keepWithinRange(convertedColor.green - changeAmount),
	};
	return convertRGBNumberToHex(changedRGB);
}

export function lighten(color: string, percent: number): string {
	return changeHex(color, percent);
}

export function darken(color: string, percent: number): string {
	return changeHex(color, percent, false);
}
