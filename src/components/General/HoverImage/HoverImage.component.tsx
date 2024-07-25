import * as React from "react";

import { StyledFigure } from "./HoverImage.styles";

const HoverImage: React.FC<HoverImageProps> = ({
	publicURL,
	name,
	url,
	color,
	size,
	square,
	marginRightOnPhone,
}) => {
	// Note: For accessibility reasons, img alt and figcaption need to have different values
	return url ? (
		<a href={url}>
			<StyledFigure
				size={size}
				square={square}
				color={color}
				marginRightOnPhone={marginRightOnPhone}
			>
				<img src={publicURL} alt={`Link to ${name}`} />
				<figcaption>{name}</figcaption>
			</StyledFigure>
		</a>
	) : (
		<StyledFigure
			size={size}
			square={square}
			color={color}
			marginRightOnPhone={marginRightOnPhone}
		>
			<img src={publicURL} alt={name} />
			<figcaption>{name}</figcaption>
		</StyledFigure>
	);
};

export default HoverImage;
