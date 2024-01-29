import { useEffect, useState } from 'react';

export interface Rect {
  width?: number;
  height?: number;
  padding?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  },
  margin?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  },
}

export function useRect(rect?: Rect) {

  const [width, setWidth] = useState(rect?.width || 0);
  const [height, setHeight] = useState(rect?.height || 0);
  const [paddingTop, setPaddingTop] = useState(rect?.padding?.top || 0);
  const [paddingLeft, setPaddingLeft] = useState(rect?.padding?.left || 0);
  const [paddingRight, setPaddingRight] = useState(rect?.padding?.right || 0);
  const [paddingBottom, setPaddingBottom] = useState(rect?.padding?.bottom || 0);
  const [marginTop, setMarginTop] = useState(rect?.margin?.top || 0);
  const [marginLeft, setMarginLeft] = useState(rect?.margin?.left || 0);
  const [marginRight, setMarginRight] = useState(rect?.margin?.right || 0);
  const [marginBottom, setMarginBottom] = useState(rect?.margin?.bottom || 0);

  useEffect(() => {
    setWidth(state => rect?.width !== undefined ? rect.width : state);
    setHeight(state => rect?.height !== undefined ? rect.height : state);
    setPaddingTop(state => rect?.padding?.top !== undefined ? rect.padding.top : state);
    setPaddingLeft(state => rect?.padding?.left !== undefined ? rect.padding.left : state);
    setPaddingRight(state => rect?.padding?.right !== undefined ? rect.padding.right : state);
    setPaddingBottom(state => rect?.padding?.bottom !== undefined ? rect.padding.bottom : state);
    setMarginTop(state => rect?.margin?.top !== undefined ? rect.margin.top : state);
    setMarginLeft(state => rect?.margin?.left !== undefined ? rect.margin.left : state);
    setMarginRight(state => rect?.margin?.right !== undefined ? rect.margin.right : state);
    setMarginBottom(state => rect?.margin?.bottom !== undefined ? rect.margin.bottom : state);
  }, [
    rect?.width,
    rect?.height,
    rect?.padding?.top,
    rect?.padding?.left,
    rect?.padding?.right,
    rect?.padding?.bottom,
    rect?.margin?.top,
    rect?.margin?.left,
    rect?.margin?.right,
    rect?.margin?.bottom,
  ]);

  return {
    width,
    height,
    padding: {
      top: paddingTop,
      left: paddingLeft,
      right: paddingRight,
      bottom: paddingBottom
    },
    margin: {
      top: marginTop,
      left: marginLeft,
      right: marginRight,
      bottom: marginBottom
    },
    setWidth,
    setHeight,
    setPaddingTop,
    setPaddingLeft,
    setPaddingRight,
    setPaddingBottom,
    setMarginTop,
    setMarginLeft,
    setMarginRight,
    setMarginBottom,
    setPadding: (top: number, left: number, right: number, bottom: number) => {
      setPaddingTop(top);
      setPaddingLeft(left);
      setPaddingRight(right);
      setPaddingBottom(bottom);
    },
    setMargin: (top: number, left: number, right: number, bottom: number) => {
      setMarginTop(top);
      setMarginLeft(left);
      setMarginRight(right);
      setMarginBottom(bottom);
    }
  };
}
