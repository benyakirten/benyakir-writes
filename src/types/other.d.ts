import { DefaultTheme } from 'styled-components/native'

declare module '*.png'
declare module '*.svg'
declare module '*.json'
declare module '*.ttf'
declare module '*.js'
declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

// https://nyxo.app/tips-for-using-typescript-with-styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends BaseTheme {}
}
