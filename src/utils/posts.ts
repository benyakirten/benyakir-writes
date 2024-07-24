export function createSearchableString(arr: (string | number | undefined)[]) {
	return (
		arr.reduce(
			(acc, next) =>
				next === 0 || next
					? `${formatWpText(next.toString().toLowerCase())} ${acc}`
					: `${acc}`,
			"",
		) as string
	).trim();
}

export function formatWpText(text: string) {
	return text
		.replace(/<p>/g, "")
		.replace(/<\/p>/g, "")
		.replace(/&#?\w+;/g, "")
		.replace(/\[/g, "")
		.replace(/\]/g, "")
		.replace(/\n/g, "");
}

export function rigorousTextFormat(text: string) {
	return text
		.replace(/<p>/g, "")
		.replace(/<\/p>/g, "")
		.replace(/&#?\w+;/g, "")
		.replace(/\[/g, "")
		.replace(/\]/g, "")
		.replace(/\n/g, "")
		.replace(/\,/g, "")
		.replace(/\"/g, "")
		.replace(/\'/g, "")
		.replace(/\)/g, "")
		.replace(/\(/g, "")
		.replace(/\./g, "")
		.replace(/\?/g, "")
		.replace(/\!/g, "");
}

export const createMetaForObject = (item: object) =>
	createSearchableString(Object.values(item).filter((v) => !!v));

export const createLookupMeta = (meta: string) =>
	rigorousTextFormat(meta)
		.split(/[-\s]/)
		.reduce<Record<string, true>>((acc, next) => {
			if (next) {
				acc[next] = true;
			}

			return acc;
		}, {});
