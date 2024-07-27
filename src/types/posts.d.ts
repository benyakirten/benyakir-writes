import type { IGatsbyImageData } from "gatsby-plugin-image";

type PostType = {
	content: string;
	slug?: string;
	title: string;
};

type ProjectType = PostType & {
	project: {
		technologies: string;
		mainLink?: string;
		repoLink?: string;
		hostedOn?: string;
		firstReleased: string;
		latestUpdate?: string;
	};
};

type PartialFlattenedProject = PostType & {
	shortTechnologies: string[];
	longTechnologies: string[];
	mainLink?: string;
	repoLink?: string;
	hostedOn?: string;
	firstReleased: DateInformation;
	latestUpdate?: DateInformation;
};

type FlattenedProject = PartialFlattenedProject & {
	meta: string;
};

type FlattenedProjectCard = PartialFlattenedProject & {
	icons: FileNode[];
	meta: BooleanLookup;
};

type BookType = PostType & {
	book: {
		relatedProjectDesc?: string;
		purchaseLinks: string;
		purchaseLinksNames: string;
		publishedOn: string;
		cover: null | {
			localFile: {
				childImageSharp: {
					gatsbyImageData: IGatsbyImageData;
				};
			};
		};
		relatedStories: null | TitleWithSlug[];
		relatedProject: null | TitleWithSlug;
	};
};

type PartialFlattenedBook = PostType & {
	cover: null | IGatsbyImageData;
	published: DateInformation;
	purchaseLinks: NamedLink[];
	stories: null | TitleWithSlug[];
	project:
		| null
		| (TitleWithSlug & {
				description: string | undefined;
		  });
};

type FlattenedBook = PartialFlattenedBook & {
	meta: string;
};

type AuthoredItemCard = FlattenedBookCard | FlattenedStoryCard;

type FlattenedBookCard = PartialFlattenedBook & {
	meta: BooleanLookup;
};

type FlattenedStoryCard = PartialFlattenedStory & {
	meta: BooleanLookup;
};

type StoryType = PostType & {
	shortStory: {
		publishedOn: string;
		relatedBook:
			| null
			| (TitleWithSlug & {
					content: string;
					book: {
						cover: null | {
							localFile: {
								childImageSharp: {
									gatsbyImageData: IGatsbyImageData;
								};
							};
						};
					};
			  });
		relationshipToBook: null | string;
	};
};

type PartialFlattenedStory = PostType & {
	published: DateInformation;
	book:
		| null
		| (TitleWithSlug & {
				content: string;
				relationship: string;
				cover: null | IGatsbyImageData;
		  });
};

type FlattenedStory = PartialFlattenedStory & {
	meta: string;
};

type SingleBook = {
	title: string;
	content: string;
	book: {
		coverDesigner: null | string;
		coverDesignerBio: null | string;
		coverDesignerLinks: null | string;
		coverDesignerLinksNames: null | string;
		publishedOn: string;
		purchaseLinks: string;
		purchaseLinksNames: string;
		relatedProject: null | {
			title: string;
			slug: string;
		};
		relatedProjectDesc?: string;
		relatedStories:
			| null
			| {
					title: string;
					slug: string;
					content: string;
			  }[];
		cover: null | {
			localFile: {
				childImageSharp: {
					gatsbyImageData: IGatsbyImageData;
				};
			};
		};
	};
};

type FlattenedSingleBook = {
	title: string;
	content: string;
	published: DateInformation;
	coverDesigner?: {
		name: string;
		bio: string;
		links?: NamedLink[];
	};
	purchaseLinks: NamedLink[];
	project: null | {
		title: string;
		slug: string;
		description?: string;
	};
	stories:
		| null
		| {
				title: string;
				slug: string;
				content: string;
		  }[];
	cover: null | IGatsbyImageData;
	fallbackCover: string;
};

type SingleStory = {
	title: string;
	content: string;
	slug: string;
	shortStory: {
		alternateLinks: null | string;
		alternateLinksNames: null | string;
		publishedOn: string;
		relationshipToBook?: string;
		relatedBook: null | {
			title: string;
			content: string;
			slug: string;
			book: {
				relatedProjectDesc: null | string;
				relatedProject: null | {
					title: string;
					slug: string;
				};
				cover: null | {
					localFile: {
						childImageSharp: {
							gatsbyImageData: IGatsbyImageData;
						};
					};
				};
			};
		};
	};
};

type FlattenedSingleStory = {
	title: string;
	content: string;
	slug: string;
	alternateLinks?: NamedLink[];
	published: DateInformation;
	book: null | {
		title: string;
		content: string;
		slug: string;
		relationship: string;
		cover: null | IGatsbyImageData;
	};
	project: null | {
		title: string;
		slug: string;
		description: string;
	};
	fallbackCover: string;
};

type BlogPostType = {
	title: string;
	slug: string;
	excerpt?: string;
	date: string;
	content?: string;
	categories: {
		nodes:
			| null
			| {
					name: string;
			  }[];
	};
	tags: {
		nodes:
			| null
			| {
					name: string;
			  }[];
	};
};

export type PartiallyFlattenedBlogPost = {
	title: string;
	slug: string;
	published: DateInformation;
	excerpt?: string;
	content?: string;
	categories: null | string[];
	tags: null | string[];
};

type FlattenedBlogPost = PartiallyFlattenedBlogPost & {
	meta: string;
};

type FlattenedBlogCard = PartiallyFlattenedBlogPost & {
	meta: BooleanLookup;
};

type SearchType = "book" | "story" | "project" | "post";

type SearchableBlogPost = FlattenedBlogPost & {
	type: "post";
};

type SearchableBook = FlattenedBook & {
	type: "book";
};

type SearchableProject = FlattenedProject & {
	type: "project";
};

type SearchableStory = FlattenedStory & {
	type: "story";
};

type GlobalSearch = {
	books: SearchableBook[];
	stories: SearchableStory[];
	projects: SearchableProject[];
	posts: SearchableBlogPost[];
};

type SearchableItem = {
	type: SearchType;
	meta: {
		[key: string]: boolean;
	};
	title: string;
	slug: string;
};
