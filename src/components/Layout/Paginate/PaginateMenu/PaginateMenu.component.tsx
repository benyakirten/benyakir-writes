import * as React from 'react'

import { Text } from '@Input'

import { Row } from '@Styles/general-components'
import { PageFlip, PageNumber } from './PaginateMenu.styles'

const PaginateMenu: React.FC<PaginateMenuProps> = ({
  currentPage,
  maxPages,
  onLeft,
  onRight,
  limit,
  setLimit,
  disableRight,
  name,
}) => {
  const randId = Math.random().toString()
  const doNothing = () => {}
  const adjustLimit = (newLimit: string) => {
    const lim = +newLimit
    if (isFinite(lim) && lim > 0 && lim % 1 === 0) {
      setLimit(lim)
    }
  }
  const enableRightButton = currentPage < maxPages && !disableRight
  return (
    <Row style={{ justifyContent: 'space-between' }}>
      <Row style={{ margin: '2rem 0' }}>
        <PageFlip
          disabled={currentPage === 0}
          onClick={currentPage === 0 ? doNothing : onLeft}
          left={true}
          data-cy="page-flip-left"
        >
          &#10148;
        </PageFlip>
        <PageNumber>
          {currentPage + 1} (of {maxPages + 1})
        </PageNumber>
        <PageFlip
          disabled={!enableRightButton}
          onClick={enableRightButton ? onRight : doNothing}
          data-cy="page-flip-right"
        >
          &#10148;
        </PageFlip>
      </Row>
      <Text
        value={limit.toString()}
        onChange={adjustLimit}
        label="Items Per Page"
        name={`${name}-adjust-items-per-page-${randId}`}
        cyId="adjust-items-per-page"
      />
    </Row>
  )
}

export default PaginateMenu
