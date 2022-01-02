import * as React from 'react'

import DraggableDestinationItem from '../DestinationItem/DestinationItem.component'
import { DestinationColumn } from './DestinationList.styles'

import { DestinationListProps } from '@Types/props/draggable'

const DraggableDestinationList: React.FC<DestinationListProps> = ({ destinations }) => {
  return (
    <DestinationColumn>
      {destinations.map(({ title, content, onDrop }) => (
        <DraggableDestinationItem key={title} title={title} onDrop={onDrop}>
          {content}
        </DraggableDestinationItem>
      ))}
    </DestinationColumn>
  )
}

export default DraggableDestinationList