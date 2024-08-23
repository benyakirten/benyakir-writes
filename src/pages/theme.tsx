import * as React from "react";

import { Grouping, LeadHeading, Page } from "@Styles/general-components";
import { ThemeOptions } from "@Variants";
import { themeDescription } from "@/data/search";
import { HeadBase } from "@/components/General";

export const Head: React.FC = () => (
	<HeadBase title="Theme" description={themeDescription} />
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
