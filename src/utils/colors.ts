import chroma from "chroma-js";
import { round } from "./numbers";
import { validateRange } from "./validation";

const HSL_REGEX_PARSER = /hsl\(([a-zA-Z0-9\.]+) (\w+)%? (\w+)%?\)/;

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
		throw new Error("Unable to validate color values");
	}
	return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

/**
 * Function to convert a hex string (i.e. #FF0000) to an HSL color object
 */
export function _convertHexToHSL(color: string): HSLColor {
	const rgb = convertHexToRGBNumber(color);
	const red = rgb.red / 255;
	const green = rgb.green / 255;
	const blue = rgb.blue / 255;

	const max = Math.max(red, green, blue);
	const min = Math.min(red, green, blue);

	let hue = 0;
	let saturation = 0;
	const luminance = (max + min) / 2;

	if (max !== min) {
		const delta = max - min;
		saturation = delta / (luminance > 0.5 ? 2 - max - min : max + min);
		switch (max) {
			case red:
				hue = ((green - blue) / delta) % 6;
				break;
			case green:
				hue = (blue - red) / delta + 2;
				break;
			case blue:
				hue = (red - green) / delta + 4;
				break;
			default:
				break;
		}
	}

	if (hue < 0) {
		hue += 6;
	}

	return {
		hue: Math.round(hue * 60),
		saturation,
		luminance,
	};
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
	return `hsl(${color.hue} ${Math.round(color.saturation * 100)}% ${Math.round(color.luminance * 100)}%)`;
}

export function _convertHSLToHex(hsl: HSLColor): string {
	let r: number;
	let g: number;
	let b: number;

	if (hsl.saturation === 0) {
		r = g = b = hsl.luminance * 255;
	} else {
		// Adaptation of https://github.com/gka/chroma.js/blob/2a429f21f02c70420df9be9cb6cd302648f36187/src/io/hsl/hsl2rgb.js
		const t3 = [0, 0, 0];
		const c = [0, 0, 0];
		const t2 =
			hsl.luminance < 0.5
				? hsl.luminance * (1 + hsl.saturation)
				: hsl.luminance + hsl.saturation - hsl.luminance * hsl.saturation;
		const t1 = 2 * hsl.luminance - t2;
		const h_ = hsl.hue / 360;
		t3[0] = h_ + 1 / 3;
		t3[1] = h_;
		t3[2] = h_ - 1 / 3;
		for (let i = 0; i < 3; i++) {
			if (t3[i] < 0) t3[i] += 1;
			if (t3[i] > 1) t3[i] -= 1;
			if (6 * t3[i] < 1) c[i] = t1 + (t2 - t1) * 6 * t3[i];
			else if (2 * t3[i] < 1) c[i] = t2;
			else if (3 * t3[i] < 2) c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
			else c[i] = t1;
		}
		[r, g, b] = [c[0] * 255, c[1] * 255, c[2] * 255];
	}

	const rHex = toHex(r);
	const gHex = toHex(g);
	const bHex = toHex(b);

	return `#${rHex}${gHex}${bHex}`;
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
