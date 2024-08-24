import React from "react";
import { styled } from "styled-components";

import { FONT_XXS, SIZE_SM } from "@/styles/variables";
import { getPrettyDate } from "@/utils/dates";
import { CalendarIcon } from "../Icons";
import { media } from "@/styles/queries";

const IconContainer = styled.div<{ span: number }>`
	grid-column: span ${(props) => props.span};
	color: ${(props) => props.theme.base.pillText};
	font-size: ${FONT_XXS};

    display: flex;
    gap: ${SIZE_SM};
	align-items: center;

	${media.phone} {
		grid-column: span 2;
	}
`;

const StyledIconContainer = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    width: min-content;
`;

const InnerIconContainer = styled.div`
    width: 1.5rem;
    height: 1.5rem;
`;

const IconTextContainer = styled.p`
    display: flex;
    align-items: center;

    height: 100%;
    margin-top: 1px;
`;

const IconedText: React.FC<{
	icon: React.ReactNode;
	text: React.ReactNode;
	span: number;
}> = ({ icon, text, span }) => {
	return (
		<IconContainer span={span}>
			<StyledIconContainer>
				<InnerIconContainer>{icon}</InnerIconContainer>
			</StyledIconContainer>
			<IconTextContainer>{text}</IconTextContainer>
		</IconContainer>
	);
};

export const PublishedDate: React.FC<{ date: Date; span: number }> = ({
	date,
	span,
}) => {
	const prettyDate = `Published: ${getPrettyDate(date)}`;
	return <IconedText span={span} icon={<CalendarIcon />} text={prettyDate} />;
};

export default IconedText;
