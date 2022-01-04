export const TIMEOUT_500 = 500;

export function getPageTransitionStyles(timeout: number): PageTransitionProperties {
  return {
    entering: {
      position: `absolute`,
      opacity: 0,
      tranform: 'translateY(-4rem)'
    },
    entered: {
      transition: `all ${timeout}ms ease-in-out`,
      opacity: 1,
      transform: 'translateY(0)'
    },
    exiting: {
      transition: `all ${timeout}ms ease-in-out`,
      opacity: 0,
      transform: 'translateY(4rem)'
    },
    exited: null,
    unmounted: null
  }
}