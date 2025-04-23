import React from "react";
import styled from "styled-components";

import IconedText from "@/components/Cards/IconedText.component";
import { CalendarIcon } from "@/components/Icons";
import { Card } from "@/styles/general-components";
import { media } from "@/styles/queries";
import {
	FONT_SIZE_MD,
	FONT_SIZE_SM,
	SIZE_MD,
	SIZE_SM,
	SIZE_XS,
	Z_ABOVE,
} from "@/styles/variables";
import { WorkHistoryDatum } from "@/types/portfolio";
import { calculateDuration } from "@/utils/dates";

const workHistory: WorkHistoryDatum[] = [
	{
		title: "Independent Contractor",
		company: "English Garden Talk Press",
		startDate: new Date("01/01/2025"),
		endDate: null,
		points: [
			"Designed, architected and began to implement an open and extensible word processor for writers",
		],
	},
	{
		title: "Independent Contractor",
		company: "SpringBlock",
		startDate: new Date("10/01/2023"),
		endDate: new Date("12/31/2024"),
		points: [
			"Planned and executed migration scheme to move data from legacy Oracle database to normalized Postgres database",
			"Create dynamic no-build frontend with JSDoc, Jinja templates and HTMX",
			"Designed and implemented Shopify Remix app with caching layer between external Postgres database and Shopify Admin GraphQL API",
		],
	},
	{
		title: "Frontend Engineer",
		company: "Thread",
		startDate: new Date("02/01/2022"),
		endDate: new Date("07/01/2023"),
		points: [
			"Created customer-facing and internal web applications using Svelte in collaboration with product managers and designers",
			"Authored image inspection tool with annotations, comments and socialization feature based on requirements of ML engineers, product managers and customers",
			"Aligned with backend developers to develop new features and modernize infrastructure using Golang and SQL",
			"Led efforts to ensure software quality and prevent regression by creating extensive utilities for integration testing",
			"Built internal tooling in Python and Bash to increase developer velocity",
		],
	},
	{
		title: "Web Developer",
		company: "The Saint Bridged Vineyard Press",
		startDate: new Date("09/01/2020"),
		endDate: new Date("02/01/2022"),
		points: [
			"Designed responsive websites for client discoverability with an emphasis on SEO and accessibility",
			"Developed custom WordPress themes and plugins to meet client needs",
			"Managed hosting and domain registration for clients",
		],
	},
];

const WorkHistoryContainer = styled.ul`
  display: grid;
  gap: ${SIZE_MD};
`;

const WorkHistoryItem = styled(Card)`
  position: relative;
  z-index: ${Z_ABOVE};

  display: grid;
  gap: ${SIZE_XS};
`;

const WorkHistoryPosition = styled.p`
  display: flex;
  align-items: center;
  gap: 1ch;
  ${media.phone} {
    justify-content: space-between;
    align-items: start;
  }
`;

const WorkHistoryPositionText = styled.span`
  font-weight: bold;
  font-size: ${FONT_SIZE_MD};
  white-space: nowrap;

  ${media.phone} {
    font-weight: normal;
    font-size: ${FONT_SIZE_SM};
    white-space: initial;
  }
`;

const WorkHistoryPositionAt = styled(WorkHistoryPositionText)`
  ${media.phone} {
    display: none;
  }
`;

const WorkHistoryPositionCompany = styled(WorkHistoryPositionText)`
  ${media.phone} {
    text-align: right;
  }
`;

const WorkPosition: React.FC<{ title: string; company: string }> = ({
	title,
	company,
}) => (
	<WorkHistoryPosition>
		<WorkHistoryPositionText>{title}</WorkHistoryPositionText>
		<WorkHistoryPositionAt>at</WorkHistoryPositionAt>
		<WorkHistoryPositionCompany>{company}</WorkHistoryPositionCompany>
	</WorkHistoryPosition>
);

const WorkHistoryDates = styled.div`
  margin-left: -2px;
`;

const BulletedList = styled.ul`
  margin-top: ${SIZE_SM};
  list-style: disc;
  padding-left: ${SIZE_SM};
`;

const BulletedListItem = styled.li`
  margin-top: ${SIZE_XS};
  &:first-of-type {
    margin-top: 0;
  }
`;

const WorkHistoryLength: React.FC<{ start: Date; end: Date | null }> = ({
	start,
	end,
}) => {
	function formatWorkHistoryDates(start: Date, end: Date | null): string {
		const formatter = new Intl.DateTimeFormat("en-US", {
			month: "long",
			year: "numeric",
		});

		return `${formatter.format(start)} - ${
			end ? formatter.format(end) : "Present"
		}`;
	}
	const formattedDates = formatWorkHistoryDates(start, end);
	const formattedDuration = calculateDuration(start, end);

	return (
		<WorkHistoryDates>
			<IconedText
				icon={<CalendarIcon />}
				text={<time dateTime={formattedDuration}>{formattedDates}</time>}
			/>
		</WorkHistoryDates>
	);
};

const WorkHistory: React.FC = () => {
	return (
		<WorkHistoryContainer>
			{workHistory.map((datum) => (
				<li key={datum.startDate.valueOf()}>
					<WorkHistoryItem>
						<WorkPosition title={datum.title} company={datum.company} />
						<WorkHistoryLength start={datum.startDate} end={datum.endDate} />
						<BulletedList>
							{datum.points.map((point, i) => (
								<BulletedListItem key={`${i}-${point[0]}`}>
									{point}.
								</BulletedListItem>
							))}
						</BulletedList>
					</WorkHistoryItem>
				</li>
			))}
		</WorkHistoryContainer>
	);
};

export default WorkHistory;
