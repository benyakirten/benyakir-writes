import * as React from "react";

import {
	Grouping,
	LeadHeading,
	NormalPageContents,
	Page,
} from "@Styles/general-components";
import { ThemeOptions } from "@Variants";
import { themeDescription } from "@/data/search";
import { HeadBase } from "@/components/General";

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
