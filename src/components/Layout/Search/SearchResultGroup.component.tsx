import React from "react";
import styled, { useTheme } from "styled-components";

import {
	SIZE_SM,
	Z_ABOVE,
	SANS_SERIF_FONT,
	FONT_SM,
	HORIZONTAL_XS,
	TRANSITION_NORMAL,
	SIZE_MD,
} from "@/styles/variables";
import { SearchResultGroupProps } from "./types";
import { EyeIcon } from "@/components/Icons";
import { useToggle } from "@/hooks";

const StyledSearchResultGroup = styled.li`
    padding: 0 ${SIZE_SM};
    min-height: ${SIZE_MD};
`;

const TopBar = styled.button`
    display: block;
    position: relative;
    pointer: cursor;

    width: 100%;
    border-top: 2px solid ${(props) => props.theme.base.textColor};

    &:focus-within {
        outline: 2px solid ${(props) => props.theme.base.textColor};
    }
`;

const GroupLabel = styled.h3`
    position: absolute;
    top: calc(-${SIZE_SM} + 2px);
    left: ${SIZE_SM};
    
    z-index: ${Z_ABOVE};

    font-family: ${SANS_SERIF_FONT};
    font-size: ${FONT_SM};

    background-color: ${(props) => props.theme.base.background};
    padding: ${HORIZONTAL_XS};
`;

const ToggleVisibilityButton = styled.div`
    position: absolute;
    top: calc(-${SIZE_SM} + 2px);
    right: ${SIZE_SM};

    background-color: ${(props) => props.theme.base.background};
    padding: ${HORIZONTAL_XS};
`;

const EyeBar = styled.div<{ open: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    
    background-color: ${(props) => props.theme.base.textColor};
    
    clip-path: ${(props) => (props.open ? "polygon(18% 87%, 26% 87%, 26% 86%, 18% 88%)" : "polygon(68% 4%, 76% 5%, 26% 86%, 18% 86%)")};
    transition: clip-path ${TRANSITION_NORMAL} ease;
`;

const InnerSearchResults = styled.div<{ open: boolean }>`
    display: ${(props) => (props.open ? "block" : "none")};
    margin-top: ${SIZE_SM};
`;

const SearchResultGroup: React.FC<SearchResultGroupProps> = ({
	title,
	children,
}) => {
	const [open, toggleOpen] = useToggle(true);
	const theme = useTheme() as BaseTheme;
	const collapsibleId = `collapsible-${title}`;
	const topbarId = `topbar-${title}`;

	return (
		<StyledSearchResultGroup>
			<h3>
				<TopBar
					aria-expanded={open}
					aria-label={`${open ? "Hide" : "Show"} Group`}
					aria-controls={collapsibleId}
					onClick={toggleOpen}
					id={topbarId}
				>
					<GroupLabel>{title}</GroupLabel>
					<ToggleVisibilityButton>
						<EyeIcon height="1.5rem" bgColor={theme.base.textColor} />
						<EyeBar open={open} />
					</ToggleVisibilityButton>
				</TopBar>
			</h3>
			<InnerSearchResults
				id={collapsibleId}
				role="region"
				aria-labelledby={topbarId}
				open={open}
			>
				{children}
			</InnerSearchResults>
		</StyledSearchResultGroup>
	);
};

export default SearchResultGroup;
