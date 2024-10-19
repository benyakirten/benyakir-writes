import React from "react";

const BaseHead: React.FC<{ title: string; description: string }> = ({
	title,
	description,
}) => (
	<>
		<html lang="en" />
		<title>Benyakir Writes - {title}</title>
		<meta name="description" content={description} />
	</>
);

export default BaseHead;
