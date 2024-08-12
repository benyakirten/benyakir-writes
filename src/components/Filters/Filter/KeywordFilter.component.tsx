import React from "react";

import {
	FilterButton,
	FilterMenu,
	FilterPill,
	FilterText,
	MultipleChoice,
} from "../components";
import { useFlyout } from "@/hooks/useFlyout.hook";

const MAX_KEYWORDS = 3;

const KeywordFilter: React.FC<KeywordFilterProps> = ({
	onRemove,
	onChangeType,
	onModify,
	type,
	label,
	allKeywords,
	currentKeywords,
}) => {
	const displayedKeywords = currentKeywords
		.slice(0, MAX_KEYWORDS)
		.map((k) => k.label);
	const otherKeywordCount = currentKeywords.length - MAX_KEYWORDS;

	const menuRef = React.useRef<HTMLDivElement>(null);
	const [
		keywordsOpenTop,
		keywordsOpen,
		setKeywwordsSoftOpen,
		setKeywordsHardOpen,
	] = useFlyout(menuRef);
	return (
		<FilterPill ref={menuRef} onRemove={onRemove}>
			<FilterText>{label}</FilterText>
			<FilterButton
				aria-label="Change keyword filter type"
				onClick={() => onChangeType(type === "all" ? "any" : "all")}
			>
				{type}
			</FilterButton>
			<FilterMenu
				height="13rem"
				pointUpwards={keywordsOpenTop}
				aria-expanded={keywordsOpen}
			>
				<MultipleChoice choices={allKeywords} onSelect={onModify} />
			</FilterMenu>
			<FilterButton
				borderRadiusCorners={{ topRight: "2rem", bottomRight: "2rem" }}
				filledIn={keywordsOpen}
				onMouseEnter={() => setKeywwordsSoftOpen(true)}
				onMouseLeave={() => setKeywwordsSoftOpen(false)}
				onClick={() => setKeywordsHardOpen((val) => !val)}
			>
				{displayedKeywords.join(", ")}
				{otherKeywordCount > 0 && `, ${otherKeywordCount} others`}
			</FilterButton>
		</FilterPill>
	);
};

export default KeywordFilter;
