import styled from 'styled-components'

import { ABS_BLACK } from '@StyleVars'

export const LoadingContainer = styled.span<{ size: string }>`
  display: inline-block;

  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  border: 2px solid #ddd;
  border-top: 1px solid ${(props) => props.theme.base.textColor};

  animation: rotate 1s infinite linear;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
