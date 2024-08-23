import React from "react";
import styled from "styled-components";

const TabContainer = styled.div``;

const TabList = styled.div``;

const TabButton = styled.button``;
const TabButtonLabel = styled.span``;

const TabPanel = styled.div<{ selected: boolean }>``;

const Tabs: React.FC<{
	label: string;
	tabs: { id: string; label: string; content: React.ReactNode }[];
	selectedId: string;
	onSelect: (id: string) => void;
}> = ({ label, tabs, selectedId, onSelect }) => {
	return (
		<TabContainer>
			<TabList role="tablist" aria-label={label}>
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
