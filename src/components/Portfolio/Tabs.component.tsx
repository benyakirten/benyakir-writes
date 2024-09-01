import { media } from "@/styles/queries";
import {
	SANS_SERIF_FONT,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_NORMAL,
	Z_ABOVE,
} from "@/styles/variables";
import { TabData } from "@/types/general";
import { mod } from "@/utils/numbers";
import React from "react";
import styled from "styled-components";

const TabContainer = styled.div`
	display: grid;
	gap: ${SIZE_SM};
	font-family: ${SANS_SERIF_FONT};
`;

const TabList = styled.div`
	position: relative;

	display: flex;
	align-items: center;
	justify-content: space-between;

	${media.phone} {
		flex-direction: column;
		gap: ${SIZE_XS};
	}

	width: 100%;
	padding: ${SIZE_SM};

	background-color: ${(props) => props.theme.portfolio.tabBackground};
	border-radius: ${SIZE_XS};

	&:focus-within > [data-indicator]::after {
		outline: 1px solid ${(props) => props.theme.header.link};
	}
`;

const SelectedTabIndicator = styled.div<{ $selectedIdx: number }>`
	position: absolute;
	width: 100%;
	height: 100%;

	&::after {
		content: "";

		position: absolute;
		left: ${(props) => props.$selectedIdx * 33}%;
		top: 15%;
	
		width: 31%;
		${media.tablet} {
			width: 30%;
		}
		height: 70%;
	
		opacity: ${(props) => (props.$selectedIdx === -1 ? 0 : 1)};
	
		border-radius: ${SIZE_XS};
		transition: left ${TRANSITION_NORMAL} ease, top ${TRANSITION_NORMAL} ease;
	
		background-color: ${(props) => props.theme.base.background};

		${media.phone} {
			width: 90%;
			left: 50%;
			height: 30%;
			transform: translateX(-50%);

			top: ${(props) => calculateSelectedTabIndicatorPositionTop(props.$selectedIdx)};
		}
	}
`;

function calculateSelectedTabIndicatorPositionTop(selectedIdx: number) {
	switch (selectedIdx) {
		case 0:
			return "-4px";
		case 1:
			return `calc(33% - ${SIZE_XS} - 4px)`;
		case 2:
			return `calc(66% - ${SIZE_XS} - 10px)`;
	}
}

const TabButton = styled.button`
	width: 31%;

	${media.phone} {
		width: 100%;
	}

	display: grid;
	place-items: center;
	z-index: ${Z_ABOVE};

	color: ${(props) => props.theme.portfolio.textColor};
	transition: color ${TRANSITION_NORMAL} ease;
	
	&[aria-selected='true'] {
		color: ${(props) => props.theme.portfolio.selectedTextColor};
	}
`;

const TabButtonLabel = styled.span`
	position: relative;
	white-space: nowrap;
`;

const TabPanel = styled.div<{ selected: boolean }>`
	display: ${(props) => (props.selected ? "block" : "none")};
`;

const Tabs: React.FC<{
	label: string;
	tabs: [TabData, TabData, TabData];
	selectedId: string;
	onSelect: (id: string) => void;
}> = ({ label, tabs, selectedId, onSelect }) => {
	const selectedTabButtonIdx = tabs.findIndex(({ id }) => id === selectedId);
	const tabListRef = React.useRef<HTMLDivElement>(null);

	function selectTab(dist: -1 | 1) {
		const tabId = tabs[mod(selectedTabButtonIdx + dist, tabs.length)].id;
		onSelect(tabId);

		const el = tabListRef.current?.querySelector<HTMLDivElement>(
			`#tab-${tabId}`,
		);
		el?.focus();
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		switch (e.key) {
			case "ArrowLeft":
			case "ArrowUp":
				selectTab(-1);
				break;
			case "ArrowRight":
			case "ArrowDown":
				selectTab(+1);
				break;
		}
	}

	return (
		<TabContainer onKeyDown={handleKeyDown}>
			<TabList ref={tabListRef} role="tablist" aria-label={label}>
				<SelectedTabIndicator
					data-indicator
					$selectedIdx={selectedTabButtonIdx}
				/>
				{tabs.map(({ id, label }) => {
					const selected = selectedId === id;
					return (
						<TabButton
							id={`tab-${id}`}
							key={id}
							type="button"
							role="tab"
							aria-selected={selected}
							tabIndex={selected ? 0 : -1}
							aria-controls={`panel-${id}`}
							onClick={() => onSelect(id)}
						>
							<TabButtonLabel>{label}</TabButtonLabel>
						</TabButton>
					);
				})}
			</TabList>
			<section>
				{tabs.map(({ id, content }) => (
					<TabPanel
						key={id}
						id={`panel-${id}`}
						role="tabpanel"
						aria-labelledby={`tab-${id}`}
						selected={selectedId === id}
						tabIndex={0}
					>
						{content}
					</TabPanel>
				))}
			</section>
		</TabContainer>
	);
};

export default Tabs;
