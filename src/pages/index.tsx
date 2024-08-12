import * as React from "react";

import { CustomLink } from "@Gen";
import {
	BigParagraph,
	Grouping,
	LeadHeading,
	Page,
	PageContents,
	Subtitle,
} from "@Styles/general-components";
import { homeDescription } from "@/data/search";
import { Filter } from "@/components/Filters";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Home</title>
		<meta name="description" content={homeDescription} />
	</>
);

const IndexPage: React.FC = () => {
	const [filters, setFilters] = React.useState<ItemFilter[]>([]);
	function handlePublishDate() {
		const before = new Date("2020-01-01");
		const after = new Date("2020-01-01");
		setFilters((filters) => [
			...filters,
			{ label: "Date", id: "date", before, after },
		]);
	}

	function handleSearch() {
		const label = "search";
		const id = Math.random().toString();
		const search = "";
		const type = "any";
		setFilters((filters) => [...filters, { label, search, type, id }]);
	}

	function handleKeywords() {
		const label = "Keywords";
		const currentKeywords = [
			{ label: "Test1", value: "test1" },
			{ label: "Test2", value: "test2" },
			{ label: "Test3", value: "test3" },
			{ label: "Test4", value: "test4" },
		];
		const allKeywords = [
			{ label: "Test1", value: "test1" },
			{ label: "Test2", value: "Test2" },
			{ label: "Test3", value: "test3" },
			{ label: "Test4", value: "Test4" },
			{ label: "Test5", value: "test5" },
			{ label: "Test6", value: "Test6" },
			{ label: "Test7", value: "test7" },
			{ label: "Test8", value: "Test8" },
			{ label: "Test9", value: "test9" },
			{ label: "Test10", value: "Test10" },
			{ label: "Test11", value: "test11" },
			{ label: "Test21", value: "Test12" },
		];
		const id = "keywords";
		const type = "all";
		setFilters((filters) => [
			...filters,
			{ label, id, type, currentKeywords, allKeywords },
		]);
	}
	return (
		<Page>
			<PageContents>
				<LeadHeading>Welcome to Benyakir Writes</LeadHeading>
				<Filter
					options={["Publish Date", "Keywords", "Search"]}
					onCreate={(id) => {
						if (id === "Publish Date") {
							handlePublishDate();
						} else if (id === "Search") {
							handleSearch();
						} else {
							handleKeywords();
						}
					}}
					onModifyKeywords={(id, keywords) => console.log(id, keywords)}
					onModifyDate={(time, value) => console.log(time, value)}
					onRemove={(id) => console.log(id)}
					filters={filters}
					onModifyWordFilterType={console.log}
					onModifySearch={console.log}
				/>
				<Grouping>
					<BigParagraph>
						Hello stranger or welcome back. Struggling to find a better term, I
						call this website an outlet. As an author, I write about the
						oncoming future and how us humans face the chaos of our own making.
						As a programmer, I participate in it and embrace the wonders that
						our modernity can provide. Plus, it's not that hard to make
						something that looks halfway decent--let's not talk about mobile
						right now, okay? Sidebars are great on a tablet or desktop, but they
						are dangerous and need to be carefully managed on mobile.
					</BigParagraph>
				</Grouping>
				<Grouping>
					<Subtitle>To get started, click on the bar to the left.</Subtitle>
					<BigParagraph>
						Inside you'll find the nav menu. From there you can read articles
						from my blog, about me as an author or as a programmer and web
						designer. Also you can unfold each subsection and directly access
						what you want to see.
					</BigParagraph>
				</Grouping>
				<Grouping>
					<BigParagraph>
						Hello stranger or welcome back. Struggling to find a better term, I
						call this website an outlet. As an author, I write about the
						oncoming future and how us humans face the chaos of our own making.
						As a programmer, I participate in it and embrace the wonders that
						our modernity can provide. Plus, it's not that hard to make
						something that looks halfway decent--let's not talk about mobile
						right now, okay? Sidebars are great on a tablet or desktop, but they
						are dangerous and need to be carefully managed on mobile.
					</BigParagraph>
				</Grouping>
				<Grouping>
					<Subtitle>To get started, click on the bar to the left.</Subtitle>
					<BigParagraph>
						Inside you'll find the nav menu. From there you can read articles
						from my blog, about me as an author or as a programmer and web
						designer. Also you can unfold each subsection and directly access
						what you want to see.
					</BigParagraph>
				</Grouping>
				<Grouping>
					<BigParagraph>
						Hello stranger or welcome back. Struggling to find a better term, I
						call this website an outlet. As an author, I write about the
						oncoming future and how us humans face the chaos of our own making.
						As a programmer, I participate in it and embrace the wonders that
						our modernity can provide. Plus, it's not that hard to make
						something that looks halfway decent--let's not talk about mobile
						right now, okay? Sidebars are great on a tablet or desktop, but they
						are dangerous and need to be carefully managed on mobile.
					</BigParagraph>
				</Grouping>
				<Grouping>
					<Subtitle>To get started, click on the bar to the left.</Subtitle>
					<BigParagraph>
						Inside you'll find the nav menu. From there you can read articles
						from my blog, about me as an author or as a programmer and web
						designer. Also you can unfold each subsection and directly access
						what you want to see.
					</BigParagraph>
				</Grouping>
				<Grouping>
					<Subtitle>Need to contact me?</Subtitle>
					<BigParagraph>
						If you want to learn about what I can offer you (in terms of web
						design or programming), you can look at my{" "}
						<CustomLink to="/portfolio">portfolio</CustomLink>. Or you can send
						me an email at{" "}
						<CustomLink outside to="mailto:ben@benyakiredits.com">
							ben@benyakiredits.com
						</CustomLink>
						.
					</BigParagraph>
				</Grouping>
			</PageContents>
		</Page>
	);
};

export default IndexPage;
