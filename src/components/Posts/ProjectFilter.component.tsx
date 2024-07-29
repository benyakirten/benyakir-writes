import * as React from "react";

import { Foldout } from "@Gen";
import { DatePicker, Filter, MultipleChoice } from "@Input";
import { SubHeading } from "@Styles/general-components";

import { useAlternation } from "@/hooks";

import type { ProjectsFilterProps } from "@/types/props/post-components";

const ProjectFilter: React.FC<ProjectsFilterProps> = ({
	publishedBefore,
	publishedAfter,
	hosts,
	techs,
	changePublishedBefore,
	changePublishedAfter,
	changeFilterWords,
	changeHosts,
	changeTechs,
}) => {
	const [dropdownOpen, setDropdown] = useAlternation();

	return (
		<Filter
			name="projects"
			onSearch={(val) => changeFilterWords(val.split(" "))}
		>
			<Foldout
				topbar={<SubHeading>Filter by date</SubHeading>}
				open={dropdownOpen === "date"}
				onClick={() => setDropdown("date")}
				height="10rem"
				cyId="foldout-dates"
			>
				<DatePicker
					name="proect-published-before"
					value={publishedBefore}
					label="Published before"
					onChange={changePublishedBefore}
					tabIndex={dropdownOpen === "date" ? 0 : -1}
				/>
				<DatePicker
					name="project-published-after"
					value={publishedAfter}
					label="Published after"
					onChange={changePublishedAfter}
					tabIndex={dropdownOpen === "date" ? 0 : -1}
				/>
			</Foldout>
			<Foldout
				topbar={<SubHeading>Filter by host</SubHeading>}
				open={dropdownOpen === "host"}
				onClick={() => setDropdown("host")}
				height="20rem"
				heightMultiplierOnPhone={3}
				heightMultiplierOnTablet={1.6}
				cyId="foldout-host"
			>
				<MultipleChoice
					tabIndex={dropdownOpen === "host" ? 0 : -1}
					choices={hosts}
					onSelect={changeHosts}
				/>
			</Foldout>
			<Foldout
				topbar={<SubHeading>Filter by technology</SubHeading>}
				open={dropdownOpen === "tech"}
				onClick={() => setDropdown("tech")}
				height="20rem"
				cyId="foldout-tech"
			>
				<MultipleChoice
					choices={techs}
					onSelect={changeTechs}
					tabIndex={dropdownOpen === "tech" ? 0 : -1}
				/>
			</Foldout>
		</Filter>
	);
};

export default ProjectFilter;
