import * as React from "react";

import { Grouping, LeadHeading, Page } from "@Styles/general-components";
import { ThemeOptions } from "@Variants";
import { themeDescription } from "@/data/search";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Themes</title>
		<meta name="description" content={themeDescription} />
	</>
);

const Theme: React.FC = () => {
	return (
		<Page>
			<LeadHeading>Theme Customization</LeadHeading>
			<Grouping>
				<ThemeOptions />
			</Grouping>
		</Page>
	);
};

export default Theme;
