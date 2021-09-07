import { IGatsbyImageData } from 'gatsby-plugin-image'
import { FileNode, ProjectType, BookType, StoryType, SingleBook, SingleStory, BackupImage, BlogPostType } from './posts.d'

type WpPost = {
    data: {
        wpPost: BlogPostType
    }
}

type AllWpPost = {
    data: {
        allWpPost: {
            nodes: BlogPostType[]
        }
    }
}

type WpPostByCategory = {
    data: {
        allWpPost: {
            nodes: BlogPostType[]
        }
    }
    pageContext: {
        name: string;
    }
}

type WpAuthor = {
    data: {
        allWpBook: {
            nodes: BookType[];
        }
        allWpShortstory: {
            nodes: StoryType[];
        }
    }
}

type WpAllBooks = {
    data: {
        allWpBook: {
            nodes: BookType[];
        }
    }
}

type WpAllStories = {
    data: {
        allWpShortstory: {
            nodes: StoryType[];
        }
    }
}

type WpBook = {
    data: {
        wpBook: SingleBook,
        file: {
            publicURL: string;
        }
    }
}

type WpStory = {
    data: {
        wpShortstory: SingleStory
        file: {
            publicURL: string;
        }
    }
}

type WpProject = {
    data: {
        wpProject: ProjectType
        allFile: {
            nodes: FileNode[]
        }
    }
}

type SVGImageQuery = {
    data: {
        allFile: {
            nodes: FileNode[];
        }
    }
}

type ProjectsQuery = {
    data: {
        allWpProject: {
            nodes: ProjectType[]
        }
        allFile: {
            nodes: FileNode[]
        }
    }
}