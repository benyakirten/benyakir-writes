import { Link } from "gatsby";
import * as React from "react";

import { GrowableUnderline } from "@/components/General";
import { HeadBase } from "@/components/SEO";
import {
	BigParagraph,
	LeadHeading,
	NormalPageContents,
	Page,
} from "@/styles/general-components";

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
					visit the home page{" "}
					<GrowableUnderline>
						<Link to="/">here</Link>.
					</GrowableUnderline>
				</BigParagraph>
			</NormalPageContents>
		</Page>
	);
};

export default NotFoundPage;
