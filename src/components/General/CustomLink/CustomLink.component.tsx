import * as React from 'react'

import { OutsideLink, StyledLink } from './CustomLink.styles'

const CustomLink: React.FC<LinkProps> = ({
  tabIndex = 0,
  small = false,
  dark = true,
  active = false,
  inheritColor = false,
  to,
  children,
  outside = false,
  inline = false,
  limitunderbar = false,
  underbarsize,
  wholeline = false,
}) => {
  const linkProps = {
    tabIndex,
    inline,
    small,
    active,
    dark,
    inheritColor,
    limitunderbar,
    underbarsize,
    wholeline,
  }
  return (
    <>
      {outside ? (
        <OutsideLink {...linkProps} href={to}>
          {children}
        </OutsideLink>
      ) : (
        <StyledLink {...linkProps} to={to}>
          {children}
        </StyledLink>
      )}
    </>
  )
}

export default CustomLink
