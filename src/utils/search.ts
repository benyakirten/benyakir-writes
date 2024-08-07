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
	root: TrieNode;

	constructor(words: [string, number][] = []) {
		this.root = new TrieNode();
		for (const [word, count] of words) {
			this.insert(word, count);
		}
	}

	insert(word: string, count: number): void {
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

	// Returns all possible nodes that can be formed from the given prefix
	private dfs(
		prefix: string,
		node = this.root,
		results: CompletionOption[] = [],
	): CompletionOption[] | null {
		let allResults = results;
		if (node.weight !== null) {
			results.push({ word: prefix, weight: node.weight });
		}

		for (const [char, childNode] of node.children) {
			const options = this.dfs(prefix + char, childNode, allResults);
			if (options) {
				allResults = allResults.concat(options);
			}
		}

		return allResults;
	}

	suggest(prefix: string): string[] | null {
		const options = this.dfs(prefix);
		if (!options || options.length === 0) {
			return null;
		}

		return options
			.sort((a, b) => {
				if (a.weight === null) {
					return 1;
				}

				if (b.weight === null) {
					return -1;
				}

				return b.weight - a.weight;
			})
			.map((option) => option.word);
	}

	findBest(options: CompletionOption[]): string | null {
		if (options.length === 0) {
			return null;
		}

		const bestOption = options.reduce<CompletionOption>((acc, option) => {
			if (option.weight === null) {
				return acc;
			}

			if (acc.weight === null || option.weight > acc.weight) {
				return option;
			}

			return acc;
		}, options[0]);

		return bestOption.word;
	}
}
