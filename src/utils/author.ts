import { getTimeFromDateString } from "./dates";
import { truncate } from "./strings";
import type {
	FlattenedSingleBook,
	FlattenedSingleStory,
	SingleBook,
	SingleStory,
} from "@Types/posts";

export const flattenBook = (
	book: SingleBook,
	fallbackCover: string,
): FlattenedSingleBook => {
	const allPurchaseLinks = book.book.purchaseLinks.split(", ");
	const allPurchaseLinkNames = book.book.purchaseLinksNames.split(", ");
	const purchaseLinks = allPurchaseLinks.map((l, idx) => ({
		link: l,
		name: allPurchaseLinkNames.length > idx ? allPurchaseLinkNames[idx] : l,
	}));

	const data: FlattenedSingleBook = {
		title: book.title,
		content: book.content,
		purchaseLinks,
		published: getTimeFromDateString(book.book.publishedOn),
		project: book.book.relatedProject
			? {
					title: book.book.relatedProject.title,
					slug: book.book.relatedProject.slug,
					description: book.book.relatedProjectDesc,
				}
			: null,
		stories: book.book.relatedStories
			? book.book.relatedStories.map((s) => ({
					...s,
					content: truncate(s.content, 100),
				}))
			: null,
		cover: book.book.cover
			? book.book.cover.localFile.childImageSharp.gatsbyImageData
			: null,
		fallbackCover,
	};

	if (book.book.coverDesigner && book.book.coverDesignerBio) {
		data.coverDesigner = {
			name: book.book.coverDesigner,
			bio: book.book.coverDesignerBio,
		};
		if (book.book.coverDesignerLinks) {
			const bookDesignerLinks = book.book.coverDesignerLinks.split(", ");
			const bookDesignerLinkNames =
				book.book.coverDesignerLinksNames?.split(", ");
			const links = bookDesignerLinks.map((l, idx) => ({
				link: l,
				name:
					bookDesignerLinkNames && bookDesignerLinkNames.length > idx
						? bookDesignerLinkNames[idx]
						: l,
			}));
			data.coverDesigner.links = links;
		}
	}
	return data;
};

export const flattenStory = (
	story: SingleStory,
	fallbackCover: string,
): FlattenedSingleStory => {
	const data: FlattenedSingleStory = {
		title: story.title,
		content: story.content,
		slug: story.slug,
		published: getTimeFromDateString(story.shortStory.publishedOn),
		book: !story.shortStory.relatedBook
			? null
			: {
					title: story.shortStory.relatedBook.title,
					content: truncate(story.shortStory.relatedBook.content, 150),
					slug: story.shortStory.relatedBook.slug,
					relationship: story.shortStory.relationshipToBook
						? story.shortStory.relationshipToBook
						: "Related book",
					cover: story.shortStory.relatedBook.book.cover
						? story.shortStory.relatedBook.book.cover.localFile.childImageSharp
								.gatsbyImageData
						: null,
				},
		project: !story.shortStory.relatedBook?.book.relatedProject
			? null
			: {
					title: story.shortStory.relatedBook.book.relatedProject.title,
					slug: story.shortStory.relatedBook.book.relatedProject.slug,
					description: story.shortStory.relatedBook.book.relatedProjectDesc
						? story.shortStory.relatedBook.book.relatedProjectDesc
						: "Related project",
				},
		fallbackCover,
	};

	if (story.shortStory.alternateLinks) {
		const storyLinks = story.shortStory.alternateLinks.split(", ");
		const storyLinkNames = story.shortStory.alternateLinksNames?.split(", ");
		const alternateLinks = storyLinks.map((l, idx) => ({
			link: l,
			name:
				storyLinkNames && storyLinkNames.length > idx ? storyLinkNames[idx] : l,
		}));
		data.alternateLinks = alternateLinks;
	}

	return data;
};
