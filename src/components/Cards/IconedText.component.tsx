import React from "react";
import { styled } from "styled-components";

import { SIZE_XS } from "@/styles/variables";
import { CalendarIcon } from "../Icons";
import { media } from "@/styles/queries";
import { Time } from "../General";

const IconContainer = styled.div<{ span?: number }>`
	grid-column: span ${(props) => props.span ?? 2};
	color: ${(props) => props.theme.base.pillText};

    display: flex;
    gap: ${SIZE_XS};
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

const IconTextContainer = styled.div`
    display: flex;
    align-items: center;

    height: 100%;
    margin-top: 1px;
`;

const IconedText: React.FC<{
	icon: React.ReactNode;
	text: React.ReactNode;
	span?: number;
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

export const PublishedDate: React.FC<{
	date: Date;
	span?: number;
	icon?: React.ReactNode;
}> = ({ date, span, icon = <CalendarIcon /> }) => {
	return (
		<IconedText
			span={span}
			icon={icon}
			text={<Time date={date} formatter={(date) => `Published: ${date}`} />}
		/>
	);
};

export default IconedText;
