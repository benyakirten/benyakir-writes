import { SIZE_XS } from "@/styles/variables";
import React from "react";
import styled from "styled-components";

const StyledThemeButton = styled.button`
    display: grid;
    gap: ${SIZE_XS};
    justify-content: center;
`;

const ThemeButton: React.FC<ThemeButtonProps> = ({ icon, text, onClick }) => {
	return (
		<StyledThemeButton onClick={onClick}>
			{icon}
			<p>{text}</p>
		</StyledThemeButton>
	);
};

export default ThemeButton;
