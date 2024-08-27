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

export function flattenTheme(theme: BaseTheme): ThemeGroups {
	// Simply enough, this is a method to make sure that I will no longer never have to update
	// The theme customization inputs if I ever change what properties are on them
	// This method (recursively) reduces all theme properties other than name to
	// a list of property groups, and each of those is a list of properties
	// each of which is a series of arrays, which when converted into a string
	// become the accessors the appropriate properties - either to access or set the properties
	const _theme = Object.keys(theme).reduce<Record<string, string>>(
		(acc, next) => {
			if (next === "name" || next === "id") {
				return acc;
			}
			acc[next] = theme[next as keyof BaseTheme];
			return acc;
		},
		{},
	);
	function recursiveFlattenControls(
		controlGroup: RecursiveControlGroup,
		accessors: ThemeAccessors,
	): ThemeGroup {
		let controls: string[][] = [];

		for (const key in controlGroup) {
			if (typeof controlGroup[key] === "string") {
				controls.push([...accessors, key]);
			} else {
				const subset = recursiveFlattenControls(
					controlGroup[key] as RecursiveControlGroup,
					[...accessors, key],
				);
				controls = controls.concat(subset);
			}
		}
		return controls;
	}

	const flattenedControlGroups = [];
	for (const key in _theme) {
		const val = _theme[key];
		if (typeof val === "string") {
			continue;
		}

		const flattenedGroup = recursiveFlattenControls(val, [key]);
		flattenedControlGroups.push(flattenedGroup);
	}
	return flattenedControlGroups;
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

export function deepEquals<T>(a: T, b: T): boolean {
	if (a === null) {
		return b === null;
	}

	if (b === null) {
		return a === null;
	}

	if (typeof a !== typeof b) {
		return false;
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) {
			return false;
		}

		for (let i = 0; i < a.length; i++) {
			if (!deepEquals(a[i], b[i])) {
				return false;
			}
		}

		return true;
	}

	if (typeof a === "object" && typeof b === "object") {
		const aKeys = Object.keys(a);
		const bKeys = Object.keys(b);

		if (aKeys.length !== bKeys.length) {
			return false;
		}

		for (const key of aKeys) {
			if (key in b === false) {
				return false;
			}

			if (!deepEquals(a[key as keyof T], b[key as keyof T])) {
				return false;
			}
		}

		return true;
	}

	return a === b;
}

export function noop() {
	return null;
}

export function formatOutsideLink(link: string) {
	if (link.startsWith("http")) {
		return link;
	}
	return `https://${link}`;
}
