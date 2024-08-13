import React from "react";
import { styled } from "styled-components";

import { HORIZONTAL_XS } from "@/styles/variables";
import { NextIcon, PreviousIcon } from "@/components/Icons";
import { StyledFilterPill } from "../components/FilterPill.component";
import { FillIn } from "@/components/General";

const DirectionButton = styled.button`
    height: 100%;
`;

const InnerContainer = styled.div`
	display: grid;
	place-items: center;

    padding: ${HORIZONTAL_XS};
`;

const PageCount = styled.div`
    display: flex;
    align-items: center;

    height: 100%;
    width: max-content;
`;

const CurrentPage: React.FC<CurrentPageProps> = ({
	currentPage,
	numPages,
	onLeft,
	onRight,
}) => {
	const previousDisabled = currentPage === 0;
	const nextDisabled = currentPage === numPages;
	return (
		<StyledFilterPill style={{ backgroundColor: "white" }}>
			<FillIn
				disabled={previousDisabled}
				borderRadiusCorners={{ topLeft: "2rem", bottomLeft: "2rem" }}
			>
				<DirectionButton
					aria-label="Previous Page"
					disabled={previousDisabled}
					onClick={onLeft}
				>
					<InnerContainer>
						<PreviousIcon />
					</InnerContainer>
				</DirectionButton>
			</FillIn>
			<PageCount>
				<InnerContainer>
					Page {currentPage + 1} / {numPages + 1}
				</InnerContainer>
			</PageCount>
			<FillIn
				disabled={nextDisabled}
				borderRadiusCorners={{ topRight: "2rem", bottomRight: "2rem" }}
			>
				<DirectionButton
					aria-label="Next Page"
					disabled={nextDisabled}
					onClick={onRight}
				>
					<InnerContainer>
						<NextIcon />
					</InnerContainer>
				</DirectionButton>
			</FillIn>
		</StyledFilterPill>
	);
};

export default CurrentPage;
