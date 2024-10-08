import { CSS_MEASUREMENT_REGEX } from "@/data/constants";

export function titleToKebab(title: string): string {
	// Since this function is only applied in the build phase
	// and on titles written by humans, the complexity/lack of it doesn't matter
	const _title = title
		.toLowerCase()
		.trim()
		.replace(/['\.\[\]\{\}\!\?\,:@#\*]/g, "")
		.replace(/\s{2,}/g, " ")
		.split(" ");
	if (_title.every((part) => part.length === 0)) {
		throw new Error(
			"Invalid title -- format must include characters other than apostraphes, spaces, !@#*[]{} or punctuation",
		);
	}
	return _title.join("-");
}

export function truncate(sentence: string, length: number) {
	if (length >= sentence.length) {
		return sentence;
	}
	const sub = sentence.substring(0, length);
	if (/^\s*$/.test(sub) || sub.length === 0) {
		throw new Error(
			"Sentence section must be longer than 0 and contain letters other than blank spaces",
		);
	}
	return sub.replace(/\s\S*$/, "...");
}

export function multiplyCSSNumber(prop: string, amount: number) {
	const match = prop.match(CSS_MEASUREMENT_REGEX);
	if (!match) return prop;
	return (+(+match[1] * amount).toFixed(1)).toString() + match[3];
}

export const capitalize = (word: string) =>
	word.length > 0 ? `${word[0].toUpperCase()}${word.slice(1)}` : "";
export const titleCase = (sentence: string | string[]): string => {
	const _sentence =
		typeof sentence === "string" ? sentence.split(" ") : sentence;
	return _sentence.map((word) => capitalize(word)).join(" ");
};

const CAMEL_CASE_REGEX = /(?=[A-Z])/;
export const camelToTitleCase = (camel: string, otherSections: string[] = []) =>
	otherSections.concat(camel.split(CAMEL_CASE_REGEX)).map(capitalize).join(" ");
