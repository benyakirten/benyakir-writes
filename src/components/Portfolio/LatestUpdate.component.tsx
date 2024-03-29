import * as React from 'react'

import { Loading } from '@/components/General'
import { getPrettyDate } from '@/utils/dates'
import { FetchState } from '@Hooks'
import { LatestUpdateState } from '@Types/hooks'

const LoadingItemRenderer: React.FC<{ state: LatestUpdateState }> = ({
  state,
}) => {
  const determineComponentByState = React.useCallback(
    (state: LatestUpdateState) => {
      if (state === FetchState.NONE) {
        return null
      }
      switch (state) {
        case FetchState.ERROR:
          return 'Unable to retrieve date'
        case FetchState.LOADING:
          return <Loading size="1.4rem" />
        default:
          return getPrettyDate(state)
      }
    },
    [state]
  )
  const component = determineComponentByState(state)
  return component === null ? component : <>Latest Update: {component}</>
}

export default LoadingItemRenderer
