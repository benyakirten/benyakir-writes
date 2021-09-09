import * as React from "react";

import { TextInputContainer } from "./Text.styles";

import { TextProps } from "@Types/props";

const Text: React.FC<TextProps> = ({ label, name, onChange, value, width }) => {
    return (
        <TextInputContainer>
            <input
                value={value}
                type="text"
                placeholder=" "
                name={name}
                id={name}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width
                }}
            />
            <label htmlFor={name}>{label}</label>
        </TextInputContainer>
    );
};

export default Text;
