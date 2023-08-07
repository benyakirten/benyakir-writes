import * as React from 'react';

import { FoldoutContainer, FoldoutBody, TopbarContainer } from './Foldout.styles';
import { DownArrow } from '@Pre';

import { findAttrInElTree } from '@Utils/dom';

const Foldout: React.FC<FoldoutProps> = ({
  open = false,
  height = '4rem',
  topbar,
  onClick,
  children,
  heightMultiplierOnPhone,
  heightMultiplierOnTablet,
  heightMultiplierOnLarger,
  cyId,
}) => {
  const handleContainerClick = React.useCallback(
    (e: React.BaseSyntheticEvent) => _handleContainerClick(e),
    [onClick],
  );
  function _handleContainerClick(e: React.BaseSyntheticEvent) {
    if (findAttrInElTree(e.target, 'data-navtoggle', 'no-toggle')) {
      return;
    }
    onClick && onClick();
  }
  const handleArrowClick = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();
    onClick && onClick();
  };
  return (
    <FoldoutContainer>
      <TopbarContainer onClick={(e) => handleContainerClick(e)}>
        <DownArrow
          open={open}
          tabIndex={open ? 0 : -1}
          onClick={handleArrowClick}
          cyId={cyId ? cyId : 'foldout-bar'}
        />
        {topbar}
      </TopbarContainer>
      <FoldoutBody
        data-navtoggle="no-toggle"
        heightMultiplierOnPhone={heightMultiplierOnPhone}
        heightMultiplierOnTablet={heightMultiplierOnTablet}
        heightMultiplierOnLarger={heightMultiplierOnLarger}
        height={height}
        open={open}
        aria-hidden={!open}
      >
        {children}
      </FoldoutBody>
    </FoldoutContainer>
  );
};

export default Foldout;
