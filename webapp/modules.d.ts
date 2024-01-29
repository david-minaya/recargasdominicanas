declare module '*.module.css' {
  export type Style = { [key: string]: any };
  export const style: Style;
  export function mergeStyle(style?: Style): Style;
}

declare module '*.svg';
declare module '*.png';
