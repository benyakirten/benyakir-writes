import * as React from "react";

import {
	Grouping,
	LeadHeading,
	NormalPageContents,
	Page,
} from "@/styles/general-components";
import { themeDescription } from "@/data/search";
import { HeadBase } from "@/components/SEO";
import { ThemeOptions } from "@/components/Theme";

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
