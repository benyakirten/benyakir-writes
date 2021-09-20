import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { StyledFigure } from "./HoverImage.styles";

import { HoverImageProps } from "@Types/props";

const HoverImage: React.FC<HoverImageProps> = ({
    publicURL,
    name,
    url,
    color,
    size,
    square,
    marginRightOnPhone,
}) => {
    return url ? (
        <a href={url}>
            <StyledFigure
                size={size}
                square={square}
                color={color}
                marginRightOnPhone={marginRightOnPhone}
            >
                <img src={publicURL} alt={name} />
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
