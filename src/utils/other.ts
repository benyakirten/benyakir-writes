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
