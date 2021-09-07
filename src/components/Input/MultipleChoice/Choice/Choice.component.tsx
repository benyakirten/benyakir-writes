import * as React from 'react'

import { ChoiceProps } from '@Types/props'
import { ChoiceContainer } from './Choice.styles'

const Choice: React.FC<ChoiceProps> = ({
    label,
    onSelect,
    value
}) => {
    return (
        <ChoiceContainer
            role="checkbox"
            onClick={() => onSelect(label)}
            checked={value}
        >
            {label}
        </ChoiceContainer>
    )
}

export default Choice