export const hasSomeContent = (filterWords: string[]) => {
	if (!filterWords) return false;
	if (filterWords.length === 0) return false;
	if (filterWords.length === 1 && filterWords[0].trim() === "") return false;
	return true;
};
