import chroma from "chroma-js";

import { validateRange } from "./validation";

const HSL_REGEX_PARSER = /hsl\(([a-zA-Z0-9\.]+),? (\w+)%?,? (\w+)%?\)/;

export function convertHexToRGBA(color: string, opacity = 0.4) {
	const parsedColors = convertHexToRGBNumber(color);
	return `rgba(${parsedColors.red}, ${parsedColors.green}, ${
		parsedColors.blue
	}, ${+opacity.toFixed(2)})`;
}

export function setOpacityOnHSL(color: string, opacity: number) {
	const parsedColor = parseHSLString(color);
	if (parsedColor === null) {
		throw new Error(`Unable to parse HSL color: ${color}`);
	}
	return `hsl(${parsedColor.hue} ${parsedColor.saturation * 100}% ${
		parsedColor.luminance * 100
	}% / ${opacity})`;
}

function parseAndCheck(...colors: string[]) {
	const parsedColors = colors.map((c) => Number.parseInt(c, 16));
	for (const parsedColor of parsedColors) {
		if (Number.isNaN(parsedColor) || parsedColor < 0 || parsedColor > 255) {
			throw new Error(
				`Hex string ${parsedColor} of ${colors} is unable to be parsed as a color`,
			);
		}
	}
	return parsedColors;
}

export function convertHexToRGBString(color: string): RGBString {
	let red = "";
	let green = "";
	let blue = "";

	switch (color.length) {
		case 4:
			red = `${color[1]}${color[1]}`;
			green = `${color[2]}${color[2]}`;
			blue = `${color[3]}${color[3]}`;
			break;
		case 7:
			red = color.slice(1, 3);
			green = color.slice(3, 5);
			blue = color.slice(5, 7);
			break;
		default:
			break;
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
		throw new Error(`RGB Color String ${color} cannot be parsed`);
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
		throw new Error(`Unable to validate color values ${color}`);
	}
	const getValues = (...colors: number[]) => colors.map((c) => toHex(c));

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

export function convertHexToRGBNumber(color: string): RGBNumber {
	const { red, green, blue } = convertHexToRGBString(color);
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
		throw new Error(`Unable to validate color values ${color}`);
	}
	return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

export function parseHSLString(color: string): HSLColor | null {
	const parts = color.match(HSL_REGEX_PARSER);
	if (parts === null) {
		return null;
	}

	const [_, h, saturation, luminance] = parts;
	const hue = +h;
	const sat = Number.parseInt(saturation);
	const lum = Number.parseInt(luminance);

	if (
		Number.isNaN(sat) ||
		Number.isNaN(lum) ||
		Number.isNaN(hue) ||
		hue < 0 ||
		hue > 360 ||
		sat < 0 ||
		sat > 100 ||
		lum < 0 ||
		lum > 100
	) {
		return null;
	}

	return {
		hue,
		saturation: sat / 100,
		luminance: lum / 100,
	};
}

export function toHex(val: number): string {
	return Math.round(val).toString(16).padStart(2, "0").toUpperCase();
}

export function convertHSLToCSSColor(color: HSLColor): string {
	return `hsl(${Math.round(color.hue)} ${Math.round(color.saturation * 100)}% ${Math.round(color.luminance * 100)}%)`;
}

export function convertHSLToHex(hsl: HSLColor): string {
	const { hue, saturation, luminance } = hsl;
	return chroma.hsl(hue, saturation, luminance).hex();
}

export function convertHexToHSL(hex: string): HSLColor {
	const [h, s, l] = chroma(hex).hsl();
	return {
		hue: Number.isNaN(h) ? 0 : h,
		saturation: s,
		luminance: l,
	};
}

export function isBgDark(id: string, name: string, bgColor: string): boolean {
	if (id === "1" || name.toLowerCase().includes("night")) {
		return true;
	}

	let hsl = parseHSLString(bgColor);
	if (hsl && hsl.luminance < 0.5) {
		return true;
	}

	try {
		hsl = convertHexToHSL(bgColor);
		return hsl.luminance < 0.5;
	} catch {
		return false;
	}
}
