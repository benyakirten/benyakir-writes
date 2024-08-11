import React from "react";
import { styled } from "styled-components";

export const StyledIconContainer = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
`;

export const InnerIconContainer = styled.div`
    width: 1.5rem;
    height: 1.5rem;
`;

const IconContainer: React.FC<ChildrenProp> = ({ children }) => {
	return (
		<StyledIconContainer>
			<InnerIconContainer>{children}</InnerIconContainer>
		</StyledIconContainer>
	);
};

export default IconContainer;
