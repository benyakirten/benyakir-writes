import * as React from 'react'

import { StyledAlertBox } from './AlertBox.styles'

import { AlertBoxProps } from '@Types/props';

const AlertBox: React.FC<AlertBoxProps> = ({ success, children }) => {
    return (
        <StyledAlertBox success={success}>
            {children}
        </StyledAlertBox>
    )
}

export default AlertBox;