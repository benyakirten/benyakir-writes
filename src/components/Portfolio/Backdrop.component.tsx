import { Z_ABOVE, Z_HIGH } from '@/styles/variables';
import * as React from 'react';

import { Transition, TransitionStatus } from 'react-transition-group';
import { PortfolioBackdrop } from './Portfolio.styles';

const defaultStyle = {
  transition: 'opacity 250ms ease-in-out',
  opacity: 0,
  zIndex: Z_ABOVE,
  transform: 'scale(0)',
};

const transitionStyles: Partial<Record<TransitionStatus, object>> = {
  entering: { opacity: 0, zIndex: Z_ABOVE, transform: 'scale(0)' },
  entered: { opacity: 0.1, zIndex: Z_HIGH, transform: 'scale(1)' },
  exiting: { opacity: 0.1, zIndex: Z_HIGH, transform: 'scale(1)' },
  exited: { opacity: 0, zIndex: Z_ABOVE, transform: 'scale(0)' },
};

const Backdrop: React.FC<{ visible: boolean }> = ({ visible }) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  return (
    <Transition nodeRef={nodeRef} in={visible} timeout={200}>
      {(state) => (
        <PortfolioBackdrop ref={nodeRef} style={{ ...defaultStyle, ...transitionStyles[state] }} />
      )}
    </Transition>
  );
};

export default Backdrop;
