import * as React from 'react'

import { StyledIconButton } from './IconButton.styles'

const IconButton: React.FC<IconButtonProps> = ({ iconSrc, onClick, size, alt, disabled = false }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    !disabled && onClick();
  }
  return (
    <StyledIconButton
      src={iconSrc}
      onClick={handleClick}
      size={size}
      alt={alt}
      disabled={disabled}
    />
  )
}

export default IconButton