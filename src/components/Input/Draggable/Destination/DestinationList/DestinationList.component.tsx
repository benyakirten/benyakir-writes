import * as React from 'react'

import { SubHeading } from '@Styles/general-components'

import DraggableDestinationItem from '../DestinationItem/DestinationItem.component'
import { DestinationColumn } from './DestinationList.styles'

import { DestinationListProps } from '@Types/props/draggable'

const DraggableDestinationList: React.FC<DestinationListProps> = ({ destinations, title }) => {
  return (
    <DestinationColumn>
      <SubHeading>{title}</SubHeading>
      {destinations.map(({ title, content, onDrop }) => (
        <DraggableDestinationItem title={title} onDrop={onDrop}>
          {content}
        </DraggableDestinationItem>
      ))}
    </DestinationColumn>
  )
}

export default DraggableDestinationList