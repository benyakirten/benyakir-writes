import * as React from 'react'

import { SubHeading } from '@/styles/general-components'
import { DraggableContainer } from './DraggableList.styles'

const DraggableList: React.FC<DraggableListProps> = ({ name, onDrag, targets, label, tabIndex }) => {
  return (
    <DraggableContainer>
      <SubHeading>{name}</SubHeading>
    </DraggableContainer>
  )
}

export default DraggableList