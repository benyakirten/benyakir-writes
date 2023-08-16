import { IGatsbyImageData } from 'gatsby-plugin-image'

interface PostType {
  content: string
  slug?: string
  title: string
}

interface ProjectType extends PostType {
  project: {
    technologies: string
    mainLink?: string
    repoLink?: string
    hostedOn?: string
    firstReleased: string
    latestUpdate?: string
  }
}

interface PartialFlattenedProject extends PostType {
  shortTechnologies: string[]
  longTechnologies: string[]
  mainLink?: string
  repoLink?: string
  hostedOn?: string
  firstReleased: DateInformation
  latestUpdate?: DateInformation
}

interface FlattenedProject extends PartialFlattenedProject {
  meta: string
}

interface FlattenedProjectCard extends PartialFlattenedProject {
  icons: FileNode[]
  meta: BooleanLookup
}

interface BookType extends PostType {
  book: {
    relatedProjectDesc?: string
    purchaseLinks: string
    purchaseLinksNames: string
    publishedOn: string
    cover: null | {
      localFile: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
    relatedStories: null | TitleWithSlug[]
    relatedProject: null | TitleWithSlug
  }
}

interface PartialFlattenedBook extends PostType {
  cover: null | IGatsbyImageData
  published: DateInformation
  purchaseLinks: NamedLink[]
  stories: null | TitleWithSlug[]
  project:
    | null
    | (TitleWithSlug & {
        description: string | undefined
      })
}

interface FlattenedBook extends PartialFlattenedBook {
  meta: string
}

interface FlattenedBookCard extends PartialFlattenedBook {
  meta: BooleanLookup
}

interface FlattenedStoryCard extends PartialFlattenedStory {
  meta: BooleanLookup
}

interface StoryType extends PostType {
  shortStory: {
    publishedOn: string
    relatedBook:
      | null
      | (TitleWithSlug & {
          content: string
          book: {
            cover: null | {
              localFile: {
                childImageSharp: {
                  gatsbyImageData: IGatsbyImageData
                }
              }
            }
          }
        })
    relationshipToBook: null | string
  }
}

interface PartialFlattenedStory extends PostType {
  published: DateInformation
  book:
    | null
    | (TitleWithSlug & {
        content: string
        relationship: string
        cover: null | IGatsbyImageData
      })
}

interface FlattenedStory extends PartialFlattenedStory {
  meta: string
}

type SingleBook = {
  title: string
  content: string
  book: {
    coverDesigner: null | string
    coverDesignerBio: null | string
    coverDesignerLinks: null | string
    coverDesignerLinksNames: null | string
    publishedOn: string
    purchaseLinks: string
    purchaseLinksNames: string
    relatedProject: null | {
      title: string
      slug: string
    }
    relatedProjectDesc?: string
    relatedStories:
      | null
      | {
          title: string
          slug: string
          content: string
        }[]
    cover: null | {
      localFile: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
  }
}

type FlattenedSingleBook = {
  title: string
  content: string
  published: DateInformation
  coverDesigner?: {
    name: string
    bio: string
    links?: NamedLink[]
  }
  purchaseLinks: NamedLink[]
  project: null | {
    title: string
    slug: string
    description?: string
  }
  stories:
    | null
    | {
        title: string
        slug: string
        content: string
      }[]
  cover: null | IGatsbyImageData
  fallbackCover: string
}

type SingleStory = {
  title: string
  content: string
  slug: string
  shortStory: {
    alternateLinks: null | string
    alternateLinksNames: null | string
    publishedOn: string
    relationshipToBook?: string
    relatedBook: null | {
      title: string
      content: string
      slug: string
      book: {
        relatedProjectDesc: null | string
        relatedProject: null | {
          title: string
          slug: string
        }
        cover: null | {
          localFile: {
            childImageSharp: {
              gatsbyImageData: IGatsbyImageData
            }
          }
        }
      }
    }
  }
}

type FlattenedSingleStory = {
  title: string
  content: string
  slug: string
  alternateLinks?: NamedLink[]
  published: DateInformation
  book: null | {
    title: string
    content: string
    slug: string
    relationship: string
    cover: null | IGatsbyImageData
  }
  project: null | {
    title: string
    slug: string
    description: string
  }
  fallbackCover: string
}

type BlogPostType = {
  title: string
  slug: string
  excerpt?: string
  date: string
  content?: string
  categories: {
    nodes:
      | null
      | {
          name: string
        }[]
  }
  tags: {
    nodes:
      | null
      | {
          name: string
        }[]
  }
}

export interface PartiallyFlattenedBlogPost {
  title: string
  slug: string
  published: DateInformation
  excerpt?: string
  content?: string
  categories: null | string[]
  tags: null | string[]
}

interface FlattenedBlogPost extends PartiallyFlattenedBlogPost {
  meta: string
}

interface FlattenedBlogCard extends PartiallyFlattenedBlogPost {
  meta: BooleanLookup
}

type SearchType = 'book' | 'story' | 'project' | 'post'

interface SearchableBlogPost extends FlattenedBlogPost {
  type: 'post'
}

interface SearchableBook extends FlattenedBook {
  type: 'book'
}

interface SearchableProject extends FlattenedProject {
  type: 'project'
}

interface SearchableStory extends FlattenedStory {
  type: 'story'
}

type GlobalSearch = {
  books: SearchableBook[]
  stories: SearchableStory[]
  projects: SearchableProject[]
  posts: SearchableBlogPost[]
}

type SearchableItem = {
  type: SearchType
  meta: {
    [key: string]: boolean
  }
  title: string
  slug: string
}
