import { navigate } from 'gatsby'
import * as React from 'react'

import LatestUpdate from '@/components/Portfolio/LatestUpdate.component'
import { Button, IconGrid } from '@Gen'
import {
  CardSection,
  GroupingBox,
  List,
  LItem,
  Row,
  RowUntilPhone,
  SubHeading,
  Subtitle,
} from '@Styles/general-components'

import { getPrettyDate } from '@Utils/dates'

import { ProjectHeaderProps } from '@Types/props/post-components'

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  icons,
  latestUpdateState,
}) => {
  return (
    <GroupingBox>
      <RowUntilPhone style={{ flexWrap: 'nowrap', alignItems: 'start' }}>
        {((project.hostedOn && project.mainLink) || project.repoLink) && (
          <CardSection>
            <Subtitle>Links</Subtitle>
            <Row style={{ marginBottom: '2rem' }}>
              {project.hostedOn && project.mainLink && (
                <Button onClick={() => navigate(project.mainLink!)}>
                  On {project.hostedOn}
                </Button>
              )}
              {project.repoLink && (
                <Button onClick={() => navigate(project.repoLink!)}>
                  On GitHub
                </Button>
              )}
            </Row>
          </CardSection>
        )}
        <CardSection>
          <SubHeading>Technologies Used</SubHeading>
          <IconGrid height="4rem" icons={icons} />
        </CardSection>
        <CardSection>
          <SubHeading>Information</SubHeading>
          <List>
            <LItem>
              First Released: {getPrettyDate(project.firstReleased.date)}
            </LItem>
            <LItem>
              <LatestUpdate state={latestUpdateState} />
            </LItem>
          </List>
        </CardSection>
      </RowUntilPhone>
    </GroupingBox>
  )
}

export default ProjectHeader
