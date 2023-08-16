import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'

import { LogoContainer } from './Logo.styles'

const Logo: React.FC<LogoProps> = ({ opening, open }) => {
  const data: LogoQuery = useStaticQuery(graphql`
    query {
      file(name: { eq: "Logo" }) {
        publicURL
      }
    }
  `)

  return (
    <Link to="/">
      <LogoContainer
        src={data?.file?.publicURL}
        role="img"
        alt="Benyakir Writes Logo"
        opening={opening}
        open={open}
        aria-label="Logo"
      />
    </Link>
  )
}

export default Logo
