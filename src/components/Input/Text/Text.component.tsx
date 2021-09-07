import * as React from 'react';

import { TextInputContainer } from './Text.styles';

import { TextProps } from '@/types/props';

const Text: React.FC<TextProps> = ({
    label,
    name,
    onChange,
    value
}) => {
    return (
        <TextInputContainer>
            <input
                value={value}
                type="text"
                placeholder=" "
                id={name}
                onChange={e => onChange(e.target.value)}
            />
            <label htmlFor={name}>{label}</label>
        </TextInputContainer>
    )
}

export default Text;