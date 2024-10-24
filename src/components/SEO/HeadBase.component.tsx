import React from "react";

const BaseHead: React.FC<
	ChildrenProp & { title: string; description: string }
> = ({ title, description, children }) => (
	<>
		<html lang="en" />
		<title>Benyakir Writes - {title}</title>
		<meta name="description" content={description} />
		<meta name="author" content="Benyakir Horowitz" />
		{children}
	</>
);

export default BaseHead;
