import clsx from 'clsx';
import React, { ReactElement, cloneElement, useContext } from 'react';
import { Style, mergeStyle } from './table-header.module.css';
import { TableContext } from '../table/table.component';

interface Props { 
  autoHide?: boolean;
  children?: (ReactElement | undefined)[],
  style?: Style
}

export function TableHeader(props: Props) {

  const {
    autoHide = false,
    children,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const { hiddenHeader } = useContext(TableContext);

  return (
    <thead>
      <tr className={style.container}>
        {
          children?.map((child, index) => {
            if (child) {
              return (
                <th 
                  key={index} 
                  className={clsx(style.tab, hiddenHeader && autoHide && style.hiddenHeader)}>
                  {cloneElement(child, { className: style.cellContent })}
                </th>
              );
            }
          })
        }
      </tr>
    </thead>
  );
}
