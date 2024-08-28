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

type RecursiveControlGroup = {
	[key: string]: string | RecursiveControlGroup;
};

export function flattenTheme(theme: BaseTheme): ThemeGroups {
	// Simply enough, this is a method to make sure that I will no longer never have to update
	// The theme customization inputs if I ever change what properties are on them
	// This method (recursively) reduces all theme properties other than name to
	// a list of property groups, and each of those is a list of properties
	// each of which is a series of arrays, which when converted into a string
	// become the accessors the appropriate properties - either to access or set the properties
	const _theme = Object.keys(theme).reduce<
		Record<string, RecursiveControlGroup>
	>((acc, next) => {
		if (next === "name" || next === "id") {
			return acc;
		}
		// @ts-ignore I will be changing all of this soon.
		acc[next] = theme[next as keyof BaseTheme];
		return acc;
	}, {});

	function recursiveFlattenControls(
		controlGroup: RecursiveControlGroup,
		accessors: ThemeAccessors,
	): ThemeGroup {
		let controls: string[][] = [];

		for (const key in controlGroup) {
			if (
				typeof controlGroup[key] === "string" &&
				!controlGroup[key].includes("gradient")
			) {
				controls.push([...accessors, key]);
			} else if (typeof controlGroup[key] === "object") {
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

export function formatOutsideLink(link: string) {
	if (link.startsWith("http")) {
		return link;
	}
	return `https://${link}`;
}
