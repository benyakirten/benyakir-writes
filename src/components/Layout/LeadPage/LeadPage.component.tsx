import * as React from 'react'

import { MainContents, PageContainer, SideArea } from './LeadPage.styles'
import { LeadHeading } from '@Styles/general-components'

import { LeadPageProps } from '@Types/props/post-components'

const LeadPage: React.FC<LeadPageProps> = ({ title, children, filter }) => {
  return (
    <PageContainer>
      <LeadHeading>{title}</LeadHeading>
      <SideArea>{filter}</SideArea>
      <MainContents>{children}</MainContents>
    </PageContainer>
  )
}

export default LeadPage
