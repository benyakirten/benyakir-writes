import {
	SANS_SERIF_FONT,
	SIZE_SM,
	SIZE_XS,
	TRANSITION_NORMAL,
} from "@/styles/variables";
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
`;

const SelectedTabIndicator = styled.div<{ selectedIdx: number }>`
	position: absolute;
	width: 100%;
	height: 100%;
	padding: ${SIZE_XS};

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

const TabButton = styled.button<{ highlighted: boolean }>`
	width: 33%;
`;

const TabButtonLabel = styled.span`
	position: relative;
	z-index: 2;

	display: grid;
	place-items: center;
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
	const [highlightedTab, setHighlightedTab] = React.useState<string | null>(
		null,
	);

	const selectedTabButtonIdx = tabs.findIndex(({ id }) => id === selectedId);

	return (
		<TabContainer>
			<TabList role="tablist" aria-label={label}>
				<SelectedTabIndicator selectedIdx={selectedTabButtonIdx} />
				{tabs.map(({ id, label }) => {
					const selected = selectedId === id;
					return (
						<TabButton
							id={`tab-${id}`}
							key={id}
							type="button"
							role="tab"
							aria-selected={selected}
							highlighted={highlightedTab === id}
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
