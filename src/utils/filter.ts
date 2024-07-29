export const createChoiceSet = <T extends object, U extends keyof T>(
	items: T[],
	key: T[U] extends string[] | null ? U : never,
) => {
	const [choiceSet, _] = items
		.flatMap((item) => item[key] as string[] | null)
		.reduce<[{ label: string; value: string }[], Set<string>]>(
			([acc, set], next) => {
				if (!next) {
					return [acc, set];
				}

				if (set.has(next)) {
					return [acc, set];
				}

				acc.push({ label: next, value: next });
				set.add(next);
				return [acc, set];
			},
			[[], new Set()],
		);

	return choiceSet;
};
