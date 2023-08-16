import * as React from 'react'

import { IconCaption, IconContainer, IconImage } from './Icon.styles'

const Icon: React.FC<IconProps> = ({ icon, height = '3rem' }) => {
  return (
    <IconContainer height={height}>
      <div />
      <IconImage height={height} src={icon.publicURL} alt={icon.name} />
      <IconCaption>{icon.name}</IconCaption>
    </IconContainer>
  )
}

export default Icon
