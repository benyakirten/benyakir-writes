import React from "react";
import { styled } from "styled-components";

import { FONT_XS, HORIZONTAL_XS } from "@/styles/variables";
import { NextIcon, PreviousIcon } from "@/components/Icons";
import { StyledFilterPill } from "../components/FilterPill.component";
import { FillIn } from "@/components/General";
import { clamp } from "@/utils/numbers";

const DirectionButton = styled.button`
    height: 100%;
`;

const InnerContainer = styled.div`
	display: grid;
	place-items: center;

    padding: ${HORIZONTAL_XS};
`;

const PageNumber = styled.input`
	font-size: ${FONT_XS};
	padding: ${HORIZONTAL_XS};

	border: none;
	outline: none;

	&:focus {
		outline: 1px solid ${(prop) => prop.theme.base.border};
	}

	width: 3rem;
	border-bottom: 1px solid ${(prop) => prop.theme.base.border};
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
	onSetPage,
}) => {
	const previousDisabled = currentPage === 0;
	const nextDisabled = currentPage === numPages;

	function setPageNumber(event: React.ChangeEvent<HTMLInputElement>) {
		const value = Number.parseInt(event.target.value, 10);
		if (Number.isNaN(value)) {
			return;
		}

		const newPageNumber = clamp(value - 1, 0, numPages);
		onSetPage(newPageNumber);
	}
	return (
		<StyledFilterPill style={{ backgroundColor: "white" }}>
			<FillIn
				disabled={previousDisabled}
				borderRadiusCorners={{ topLeft: "2rem", bottomLeft: "2rem" }}
			>
				<DirectionButton
					aria-label="Previous Page"
					disabled={previousDisabled}
					onClick={() => onSetPage(currentPage - 1)}
				>
					<InnerContainer>
						<PreviousIcon />
					</InnerContainer>
				</DirectionButton>
			</FillIn>
			<PageCount>
				<InnerContainer>
					<span>
						Page{" "}
						<PageNumber
							aria-label="Set page number"
							type="number"
							value={currentPage + 1}
							onChange={setPageNumber}
						/>
						/ {numPages + 1}
					</span>
				</InnerContainer>
			</PageCount>
			<FillIn
				disabled={nextDisabled}
				borderRadiusCorners={{ topRight: "2rem", bottomRight: "2rem" }}
			>
				<DirectionButton
					aria-label="Next Page"
					disabled={nextDisabled}
					onClick={() => onSetPage(currentPage + 1)}
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
