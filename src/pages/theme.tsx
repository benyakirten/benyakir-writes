import * as React from "react";

import { HeadBase } from "@/components/SEO";
import ThemeOptions from "@/components/Theme/ThemeOptions.component";
import { themeDescription } from "@/data/search";
import {
	Grouping,
	LeadHeading,
	NormalPageContents,
	Page,
} from "@/styles/general-components";

export const Head: React.FC = () => (
	<HeadBase title="Theme" description={themeDescription} />
);

const Theme: React.FC = () => {
	return (
		<Page>
			<NormalPageContents>
				<LeadHeading>Theme Customization</LeadHeading>
				<Grouping>
					<ThemeOptions />
				</Grouping>
			</NormalPageContents>
		</Page>
	);
};

export default Theme;
