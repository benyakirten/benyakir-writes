import { clamp, round } from "./numbers";
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
export function convertHexToHSL(color: string): HSLColor {
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

	return {
		hue: Math.round(hue * 60),
		saturation: round(saturation, 2),
		luminance: round(luminance, 2),
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
	return val.toString(16).padStart(2, "0").toUpperCase();
}

export function convertHSLToHex(color: HSLColor): string {
	const chroma = (1 - Math.abs(2 * color.luminance - 1)) * color.saturation;

	// Intermediate value that is used to calculate the RGB values
	// Value will be between 0 and chroma
	const x = chroma * (1 - Math.abs(((color.hue / 60) % 2) - 1));

	let r = 0;
	let g = 0;
	let b = 0;

	if (0 <= color.hue && color.hue < 60) {
		r = chroma;
		g = x;
		b = 0;
	} else if (60 <= color.hue && color.hue < 120) {
		r = x;
		g = chroma;
		b = 0;
	} else if (120 <= color.hue && color.hue < 180) {
		r = 0;
		g = chroma;
		b = x;
	} else if (180 <= color.hue && color.hue < 240) {
		r = 0;
		g = x;
		b = chroma;
	} else if (240 <= color.hue && color.hue < 300) {
		r = x;
		g = 0;
		b = chroma;
	} else if (300 <= color.hue && color.hue <= 360) {
		r = chroma;
		g = 0;
		b = x;
	}

	const lightnessAdjustmentFactor = color.luminance - chroma / 2;
	// Normalize RGB values to [0, 1]
	r += lightnessAdjustmentFactor;
	g += lightnessAdjustmentFactor;
	b += lightnessAdjustmentFactor;

	// Convert RGB and Opacity to Hex
	const rHex = toHex(r * 255);
	const gHex = toHex(g * 255);
	const bHex = toHex(b * 255);

	return `#${rHex}${gHex}${bHex}`;
}

export function convertHSLToCSSColor(color: HSLColor): string {
	return `hsl(${color.hue} ${Math.round(color.saturation * 100)}% ${Math.round(color.luminance * 100)}%)`;
}
