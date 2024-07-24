import type * as React from "react";

import { Grouping, LeadHeading, Page } from "@Styles/general-components";
import { ThemeOptions } from "@Variants";

export const Head: React.FC = () => (
	<>
		{" "}
		<title>Benyakir Writes - Themes</title>
		<meta
			name="description"
			content="Visitors can set a color theme or customize their own.
    Optionally, they can save anything local storage and set it as the default."
		/>
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
