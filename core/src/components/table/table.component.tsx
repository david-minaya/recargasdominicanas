import React, { ReactElement, RefObject, UIEvent, createContext, useState } from 'react';
import { Style, mergeStyle } from './table.module.css';

interface Props {
  children: ReactElement[];
  refElement?: RefObject<HTMLTableElement>;
  style?: Style;
}

export const TableContext = createContext({ hiddenHeader: false });

export function Table(props: Props) {

  const {
    children,
    refElement,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const [oldScrollTop] = useState({ value: 0 });
  const [savedScrollTop] = useState({ value: 0 });
  const [hiddenHeader, setHiddenHeader] = useState(false);

  function handleScroll(e: UIEvent<HTMLTableElement>) {
    
    const scrollTop = e.currentTarget.scrollTop;
    
    if (savedScrollTop.value === 0) {
      savedScrollTop.value = scrollTop;
    }
    
    if (scrollTop > oldScrollTop.value) {
      
      if (scrollTop - savedScrollTop.value >= 40) {
        setHiddenHeader(true);
        savedScrollTop.value = 0;
      }

    } else {

      if (savedScrollTop.value - scrollTop >= 40) {
        setHiddenHeader(false);
        savedScrollTop.value = 0;
      }
    }

    oldScrollTop.value = scrollTop;
  }

  return (
    <TableContext.Provider value={{ hiddenHeader }}>
      <table 
        className={style.container}
        ref={refElement}
        onScroll={handleScroll}>
        {children}
      </table>
    </TableContext.Provider>
  );
}
