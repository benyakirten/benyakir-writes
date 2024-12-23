import { FileQuery } from "./general";
import type {
	BlogPostType,
	BookType,
	FileNode,
	ProjectType,
	SingleBook,
	SingleStory,
	StoryType,
} from "./posts.d";

type WpPost = {
	data: {
		wpPost: BlogPostType;
	};
};

type AllWpPost = {
	data: {
		allWpPost: {
			nodes: BlogPostType[];
		};
	};
};

type WpPostByCategory = {
	pageContext: {
		name: string;
	};
};

type WpAuthor = {
	data: {
		allWpBook: {
			nodes: BookType[];
		};
		allWpShortstory: {
			nodes: StoryType[];
		};
	};
};

type WpAllBooks = {
	data: {
		allWpBook: {
			nodes: BookType[];
		};
	};
};

type WpAllStories = {
	data: {
		allWpShortstory: {
			nodes: StoryType[];
		};
	};
};

type WpBook = {
	data: {
		wpBook: SingleBook;
		file: {
			publicURL: string;
		};
	};
};

type WpStory = {
	data: {
		wpShortstory: SingleStory;
		file: {
			publicURL: string;
		};
	};
};

type WpProject = {
	data: {
		wpProject: ProjectType;
		allFile: {
			nodes: FileNode[];
		};
		file: {
			publicURL: string;
		};
	};
};

type SVGImageQuery = {
	data: {
		allFile: {
			nodes: FileNode[];
		};
	};
};

// TODO: Make this type better/remove unused publicURL field
type ProjectImageData = FileNode & {
	childImageSharp: {
		gatsbyImageData: IGatsbyImageData;
	};
};

type ProjectsQuery = {
	data: {
		allFile: {
			nodes: ProjectImageData[];
		};
		ghIcon: { publicURL: string };
		liIcon: { publicURL: string };
	};
};

type GlobalQuery = {
	allWpBook: {
		nodes: BookType[];
	};
	allWpProject: {
		nodes: ProjectType[];
	};
	allWpShortstory: {
		nodes: StoryType[];
	};
	allWpPost: {
		nodes: BlogPostType[];
	};
};

type PortfolioQuery = {
	data: {
		file: {
			publicURL: string;
		};
		allWpProject: {
			nodes: ProjectType[];
		};
	};
};
