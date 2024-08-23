import * as React from "react";

import { CustomLink } from "@Gen";
import {
	BigParagraph,
	LeadHeading,
	NormalPageContents,
	Page,
} from "@Styles/general-components";
import { HeadBase } from "@/components/General";

export const Head: React.FC = () => (
	<HeadBase
		title="404"
		description="The page was not found. Plese navigate to another page."
	/>
);

const NotFoundPage: React.FC = () => {
	return (
		<Page>
			<NormalPageContents>
				<LeadHeading>Page Not Found</LeadHeading>
				<BigParagraph>
					Unfortunately, the page you were looking for doesn't exist. You can
					visit the home page<CustomLink to="/">here</CustomLink>.
				</BigParagraph>
			</NormalPageContents>
		</Page>
	);
};

export default NotFoundPage;
