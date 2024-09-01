import React from "react";

import { useFlyout } from "@/hooks/useFlyout.hook";
import { KeywordFilterProps } from "@/types/filters";
import {
	FilterButton,
	FilterMenu,
	FilterPill,
	FilterText,
	MultipleChoice,
} from "../components";
import { registerCleanupFn } from "../useFilter.hook";

const MAX_KEYWORDS = 1;

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
		setKeywordsSoftOpen,
		setKeywordsHardOpen,
	] = useFlyout(menuRef);

	const closeAllMenus = React.useCallback(() => {
		setKeywordsSoftOpen(false);
		setKeywordsHardOpen(false);
	}, [setKeywordsHardOpen, setKeywordsSoftOpen]);

	React.useEffect(() => {
		const cleanup = registerCleanupFn(label, closeAllMenus);
		return cleanup;
	});

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
				height="16.5rem"
				$pointUpwards={keywordsOpenTop}
				aria-expanded={keywordsOpen}
				onMouseEnter={() => setKeywordsSoftOpen(true)}
				onMouseLeave={() => setKeywordsSoftOpen(false)}
			>
				<MultipleChoice
					label={`Choose ${label}`}
					choices={allKeywords}
					onSelect={onModify}
				/>
			</FilterMenu>
			<FilterButton
				borderRadiusCorners={{ topRight: "2rem", bottomRight: "2rem" }}
				width="10rem"
				filledIn={keywordsOpen}
				onMouseEnter={() => setKeywordsSoftOpen(true)}
				onMouseLeave={() => setKeywordsSoftOpen(false)}
				onClick={() => setKeywordsHardOpen((val) => !val)}
			>
				{displayedKeywords.length === 0 ? (
					<span>None</span>
				) : (
					<span>
						{displayedKeywords.join(", ")}
						<span style={{ textTransform: "lowercase" }}>
							{otherKeywordCount > 0 &&
								`, and ${otherKeywordCount} other${otherKeywordCount !== 1 ? "s" : ""}`}
						</span>
					</span>
				)}
			</FilterButton>
		</FilterPill>
	);
};

export default KeywordFilter;
