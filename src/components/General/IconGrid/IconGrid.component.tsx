import * as React from 'react'

import { StyledBox } from './IconGrid.styles'

import { IconGridProps } from '@Types/props'
import Icon from '@Gen/Icon/Icon.component'

const IconGrid: React.FC<IconGridProps> = ({ icons, height = '3rem' }) => {
    return (
        <StyledBox>
            {
                icons.map(i => <Icon key={i.name} height={height} icon={i} />)
            }
        </StyledBox>
    )
}

export default IconGrid