import { keyframes } from "styled-components";

export const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(-360deg);
    }
`

export const fadeIn = keyframes`
    from {
        opacity: 0%;
    }
    to {
        opacity: 100%;
    }
`
export const slideInLeft = keyframes`
    0% {
        transform: translateX(-40vw);
        opacity: 0.2;
    }
    40% {
        transform: translateX(4vw);
        opacity: 1;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`

export const slideInRight = keyframes`
    0% {
        transform: translateX(40vw);
        opacity: 0.2;
    }
    80% {
        transform: translateX(-4vw);
        opacity: 1;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`