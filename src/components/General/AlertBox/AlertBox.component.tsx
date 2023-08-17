import * as React from 'react'

import { StyledAlertBox } from './AlertBox.styles'

const AlertBox: React.FC<AlertBoxProps> = ({ success = true, children }) => {
  return <StyledAlertBox success={success}>{children}</StyledAlertBox>
}

export default AlertBox
