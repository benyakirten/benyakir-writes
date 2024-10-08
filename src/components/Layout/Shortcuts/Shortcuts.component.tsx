import React from "react";
import styled from "styled-components";

import { CloseIcon } from "@/components/Icons";
import { LeadHeading, Subtitle } from "@/styles/general-components";
import { media } from "@/styles/queries";
import {
	FONT_LG,
	FONT_XL,
	FONT_XXL,
	FONT_XXXL,
	MODAL_SHORTCUT_BACKGROUND,
	MODAL_TEXT_COLOR,
	MONOSPACE_FONT,
	SIZE_MD,
	SIZE_SM,
	SIZE_XS,
	SIZE_XXS,
	TRANSITION_NORMAL,
} from "@/styles/variables";
import { IconButton } from "../Layout.styles";
import Modal from "../Modal.component";

const StyledContainer = styled.div`
    position: relative;
    padding: ${SIZE_MD};
    
    display: grid;
    gap: ${SIZE_MD};
`;

const CloseButton = styled(IconButton)`
    position: absolute;
    top: ${SIZE_SM};
    right: ${SIZE_SM};

    transition: opacity ${TRANSITION_NORMAL} ease;
    opacity: 0.7;
    &:hover {
        opacity: 1;
    }
`;

const ShortcutsContainer = styled.div`
    display: grid;
    gap: ${SIZE_XS};
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;

    ${media.phone} {
        grid-template-columns: 1fr;
    }
`;

const ShortcutItem = styled.div`
    display: flex;
    gap: ${SIZE_XS};
    align-items: baseline;
    justify-content: space-between;

    padding: ${SIZE_XS} ${SIZE_SM};
    border-radius: ${SIZE_XS};
`;

const ShortcutKey = styled.kbd`
    font-family: ${MONOSPACE_FONT};

    border-radius: ${SIZE_XS};
    padding: ${SIZE_XXS};
    
    background: ${MODAL_SHORTCUT_BACKGROUND};
`;

const ShortcutHeading = styled.h1`
	position: relative;

  	padding-bottom: ${SIZE_MD};

  	${FONT_XXXL};

	${media.phone} {
		${FONT_XXL};
	}
`;

const ShortcutSubtitle = styled.h2`
	position: relative;

	margin-bottom: ${SIZE_XS};

	${FONT_XL};

	${media.phone} {
		${FONT_LG};
	}
`;

type Shortcut = { key: string; description: string };

const shortcuts: Shortcut[] = [
	{ key: "?", description: "Open/Close Shortcuts Menu" },
	{ key: "⌘/ctrl + /", description: "Open Search Menu" },
	{ key: "<", description: "Close Navigation Menu" },
	{ key: ">", description: "Open Navigation Menu" },
	{ key: "esc", description: "Close Menu" },
];

const filterShortcuts: Shortcut[] = [
	{ key: "F/f", description: "Focus New Filter Button" },
	{ key: "P/p", description: "Focus Page Button" },
	{ key: "+/=", description: "Next Page" },
	{ key: "-/_", description: "Previous Page" },
];

const Shortcuts = React.forwardRef<HTMLDialogElement, { onClose: () => void }>(
	({ onClose }, ref) => {
		return (
			<Modal width="70%" ref={ref} onClose={onClose}>
				<StyledContainer>
					<ShortcutHeading>Keyboard Shortcuts</ShortcutHeading>
					<CloseButton aria-label="Close Modal" onClick={onClose}>
						<CloseIcon />
					</CloseButton>
					<article>
						<ShortcutSubtitle>General</ShortcutSubtitle>
						<ShortcutsContainer>
							{shortcuts.map(({ key, description }) => (
								<ShortcutItem key={key}>
									<span>{description}</span>
									<ShortcutKey>{key}</ShortcutKey>
								</ShortcutItem>
							))}
						</ShortcutsContainer>
					</article>
					<article>
						<ShortcutSubtitle>Filter-only</ShortcutSubtitle>
						<ShortcutsContainer>
							{filterShortcuts.map(({ key, description }) => (
								<ShortcutItem key={key}>
									<span>{description}</span>
									<ShortcutKey>{key}</ShortcutKey>
								</ShortcutItem>
							))}
						</ShortcutsContainer>
					</article>
				</StyledContainer>
			</Modal>
		);
	},
);

export default Shortcuts;
