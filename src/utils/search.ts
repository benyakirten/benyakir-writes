export const hasSomeContent = (filterWords: string[]) => {
	if (!filterWords) return false;
	if (filterWords.length === 0) return false;
	if (filterWords.length === 1 && filterWords[0].trim() === "") return false;
	return true;
};

export class TrieNode {
	constructor(
		public children: Map<string, TrieNode> = new Map(),
		public weight: number | null = null,
	) {}
}
export type CompletionOption = { word: string; weight: number };
export class Trie {
	private root: TrieNode;
	private static readonly NUM_SUGGESTIONS = 5;
	public words: string[] = [];

	constructor(words: [string, number][] = []) {
		this.root = new TrieNode();
		for (const [word, count] of words) {
			this.insert(word, count);
		}
	}

	insert(word: string, count: number): void {
		this.words.push(word);

		let node = this.root;
		for (let i = 0; i < word.length; i++) {
			const char = word[i];
			const childNode = node.children.get(char) ?? new TrieNode();
			if (!node.children.has(char)) {
				node.children.set(char, childNode);
			}

			node = childNode;
		}
		node.weight = count;
	}

	private startWith(prefix: string): TrieNode | null {
		if (prefix === "") {
			return null;
		}

		let node = this.root;
		for (let i = 0; i < prefix.length; i++) {
			const char = prefix[i];
			const childNode = node.children.get(char);
			if (!childNode) {
				return null;
			}

			node = childNode;
		}

		return node;
	}

	// Returns all possible nodes that can be formed from the given prefix
	private dfs(
		prefix: string,
		node: TrieNode,
		first = true,
	): CompletionOption[] {
		const options: CompletionOption[] = [];
		if (!first && node.weight !== null) {
			options.push({ word: prefix, weight: node.weight });
		}

		for (const [char, childNode] of node.children) {
			const childPrefix = prefix + char;
			options.push(...this.dfs(childPrefix, childNode, false));
		}

		return options;
	}

	suggest(prefix: string): CompletionOption[] | null {
		const options = this.getAutocompleteForSearch(prefix);
		if (!options) {
			return null;
		}

		return options.sort((a, b) => {
			if (a.weight === null) {
				return 1;
			}

			if (b.weight === null) {
				return -1;
			}

			return b.weight - a.weight;
		});
	}

	getLevenshteinDistance(prefix: string, suggestion: string): number {
		const prefixLength = prefix.length;
		const suggestionLength = suggestion.length;

		// Matrix to store Levenshtein distances between prefixes and suggestions
		const ldMatrix = Array.from({ length: prefixLength + 1 }, () =>
			Array.from({ length: suggestionLength + 1 }, () => 0),
		);

		// Initialize the first row and column of the matrix
		for (let i = 0; i <= prefixLength; i++) {
			// Deleting all characters from prefix
			ldMatrix[i][0] = i;
		}
		for (let j = 0; j <= suggestionLength; j++) {
			// Inserting all characters from suggestion
			ldMatrix[0][j] = j;
		}

		for (let i = 1; i <= prefixLength; i++) {
			for (let j = 1; j <= suggestionLength; j++) {
				if (prefix[i - 1] === suggestion[j - 1]) {
					ldMatrix[i][j] = ldMatrix[i - 1][j - 1];
				} else {
					ldMatrix[i][j] = Math.min(
						ldMatrix[i - 1][j] + 1, // Deletion
						ldMatrix[i][j - 1] + 1, // Insertion
						ldMatrix[i - 1][j - 1] + 1, // Substitution
					);
				}
			}
		}

		return ldMatrix[prefixLength][suggestionLength];
	}

	private getAutocompleteForSearch(prefix: string): CompletionOption[] | null {
		const headNode = this.startWith(prefix);
		if (!headNode) {
			return null;
		}

		const options = this.dfs(prefix, headNode);
		if (!options || options.length === 0) {
			return null;
		}

		return options;
	}

	getClosestLevenshteinSuggestions(prefix: string): string[] {
		const allOptionsWeighted: { word: string; weight: number }[] =
			this.words.map((word) => ({
				word,
				weight: this.getLevenshteinDistance(prefix, word),
			}));
		return allOptionsWeighted
			.sort((a, b) => a.weight - b.weight)
			.slice(0, Trie.NUM_SUGGESTIONS)
			.map((option) => option.word);
	}

	getRandomSuggestions(): string[] {
		if (this.words.length <= Trie.NUM_SUGGESTIONS) {
			return [...this.words];
		}

		const indices: number[] = [];
		while (indices.length < Trie.NUM_SUGGESTIONS) {
			const index = Math.floor(Math.random() * this.words.length);
			if (!indices.includes(index)) {
				indices.push(index);
			}
		}

		return indices.map((i) => this.words[i]);
	}
}
