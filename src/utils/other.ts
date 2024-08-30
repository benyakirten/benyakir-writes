export function encode(data: object) {
	return Object.keys(data)
		.map(
			(key) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(
					data[key as keyof typeof data],
				)}`,
		)
		.join("&");
}

export function getThemePropRecursive(
	obj: RecursiveControlGroup,
	accessors: string[],
): string | RecursiveControlGroup {
	if (accessors.length > 1) {
		const val = obj[accessors[0]];
		if (typeof val === "string") {
			return val;
		}

		return getThemePropRecursive(val, accessors.slice(1));
	}

	return obj[accessors[0]];
}

export function formatOutsideLink(link: string) {
	if (link.startsWith("http")) {
		return link;
	}
	return `https://${link}`;
}
