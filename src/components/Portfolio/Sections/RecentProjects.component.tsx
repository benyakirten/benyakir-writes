import { RecentProjectItem } from "@/types/portfolio";
import React from "react";

const RecentProjects: React.FC<{ projects: RecentProjectItem[] }> = ({
	projects,
}) => {
	return <p>RECENT PROJECTS</p>;
};

export default RecentProjects;
