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
): string {
	if (accessors.length > 1) {
		return getThemePropRecursive(
			obj[accessors[0]] as RecursiveControlGroup,
			accessors.slice(1),
		);
	}
	return obj[accessors[0]] as string;
}

export function formatOutsideLink(link: string) {
	if (link.startsWith("http")) {
		return link;
	}
	return `https://${link}`;
}
