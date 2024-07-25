import * as React from "react";

import {
	BigParagraph,
	Grouping,
	LeadHeading,
	Page,
	Subtitle,
} from "@Styles/general-components";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Privacy</title>
		<meta
			name="description"
			content="The privacy policy of Benyakir Writes. What will and will not happen
    with any data collected from our users - which is nothing because I don't track anything"
		/>
	</>
);

const PrivacyPage: React.FC = () => {
	return (
		<Page>
			<Grouping>
				<LeadHeading>Privacy Policy</LeadHeading>
				<BigParagraph>
					No personal data is collected from any website visitor. You can rest
					assurred your data will remain with you and will not be shared with
					anyone for any reason. Mostly because there isn't anything to share.
					Theme preferences, if set, will be stored in local storage, which is
					inaccessible to anyone outside of this browser when it visits this
					website. It can be deleted at any time.
				</BigParagraph>
			</Grouping>
			<Grouping>
				<Subtitle>Cookie Policy</Subtitle>
				<BigParagraph>
					There are no cookies at all on this website. Nothing keeps track of
					what pages you visit nor when. You don't need to agree to accept
					cookies because there aren't any.
				</BigParagraph>
			</Grouping>
			<Grouping>
				<Subtitle>Input Data</Subtitle>
				<BigParagraph>
					Data used for searches will remain where it is. It isn't going
					anywhere. If you do use the form on this website to contact me, the
					message will be sent to me, personally. The information, however, will
					remain between us.
				</BigParagraph>
			</Grouping>
		</Page>
	);
};

export default PrivacyPage;
