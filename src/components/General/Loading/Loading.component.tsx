import * as React from 'react'

import { LoadingContainer } from './Loading.styles'

const Loading: React.FC<LoadingProps> = ({ size = '2rem' }) => (
  <LoadingContainer size={size} />
)

export default Loading
