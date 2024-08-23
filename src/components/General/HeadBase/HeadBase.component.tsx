import React from "react";

const BaseHead: React.FC<{ title: string; description: string }> = ({
	title,
	description,
}) => (
	<>
		<html lang="en" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
		<link
			href="https://fonts.googleapis.com/css2?family=Faustina:ital,wght@0,300..800;1,300..800&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap"
			rel="stylesheet"
		/>
		<title>Benyakir Writes - {title}</title>
		<meta name="description" content={description} />
	</>
);

export default BaseHead;
