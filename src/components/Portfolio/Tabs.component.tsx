import {
	SANS_SERIF_FONT,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_NORMAL,
	Z_ABOVE,
} from "@/styles/variables";
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
	flex-wrap: wrap;

	width: 100%;
	padding: ${SIZE_SM};

	background-color: ${(props) => props.theme.portfolio.sliderBackground};
	border-radius: ${SIZE_XS};

	&:focus-within > [data-indicator]::after {
		outline: 1px solid ${(props) => props.theme.link.dark};
	}
`;

const SelectedTabIndicator = styled.div<{ selectedIdx: number }>`
	position: absolute;
	width: 100%;
	height: 100%;

	&::after {
		content: "";

		position: absolute;
		left: ${(props) => props.selectedIdx * 33}%;
		top: 15%;
	
		width: 31%;
		height: 70%;
	
		opacity: ${(props) => (props.selectedIdx === -1 ? 0 : 1)};
	
		border-radius: ${SIZE_XS};
		transition: left ${TRANSITION_NORMAL} ease;
	
		background-color: ${(props) => props.theme.base.background};
	}
`;

const TabButton = styled.button`
	width: 31%;

	display: grid;
	place-items: center;
	z-index: ${Z_ABOVE};
`;

const TabButtonLabel = styled.span`
	position: relative;

	width: min-content;
	white-space: nowrap;
`;

const TabPanel = styled.div<{ selected: boolean }>`
	display: ${(props) => (props.selected ? "block" : "none")};
`;

const Tabs: React.FC<{
	label: string;
	tabs: TabData[];
	selectedId: string;
	onSelect: (id: string) => void;
}> = ({ label, tabs, selectedId, onSelect }) => {
	const selectedTabButtonIdx = tabs.findIndex(({ id }) => id === selectedId);
	const tabListRef = React.useRef<HTMLDivElement>(null);

	function selectTab(tabId: string) {
		onSelect(tabId);

		const el = tabListRef.current?.querySelector<HTMLDivElement>(
			`#tab-${tabId}`,
		);
		el?.focus();
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		switch (e.key) {
			case "ArrowLeft":
				selectTab(tabs[mod(selectedTabButtonIdx - 1, tabs.length)].id);
				break;
			case "ArrowRight":
				selectTab(tabs[mod(selectedTabButtonIdx + 1, tabs.length)].id);
				break;
		}
	}

	return (
		<TabContainer onKeyDown={handleKeyDown}>
			<TabList ref={tabListRef} role="tablist" aria-label={label}>
				<SelectedTabIndicator
					data-indicator
					selectedIdx={selectedTabButtonIdx}
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
		</TabContainer>
	);
};

export default Tabs;
