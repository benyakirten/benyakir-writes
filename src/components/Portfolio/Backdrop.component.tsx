import { Z_ABOVE, Z_HIGH } from '@/styles/variables';
import * as React from 'react';

import { Transition, TransitionStatus } from 'react-transition-group';
import { PortfolioBackdrop } from './Portfolio.styles';

const defaultStyle = {
  transition: 'opacity 250ms ease-in-out',
  opacity: 0,
};

const transitionStyles: Partial<Record<TransitionStatus, object>> = {
  entering: { opacity: 0, zIndex: Z_ABOVE },
  entered: { opacity: 0.2, zIndex: Z_HIGH },
  exiting: { opacity: 0.1, zIndex: Z_HIGH },
  exited: { opacity: 0, zIndex: Z_ABOVE },
};

const Backdrop: React.FC<{ visible: boolean }> = ({ visible }) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  return (
    <Transition nodeRef={nodeRef} in={visible} timeout={250}>
      {(state) => (
        <PortfolioBackdrop ref={nodeRef} style={{ ...defaultStyle, ...transitionStyles[state] }} />
      )}
    </Transition>
  );
};

export default Backdrop;
