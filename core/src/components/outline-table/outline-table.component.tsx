import React, { ReactElement } from 'react';
import { OutlineCard } from '../outline-card/outline-card.component';
import { Table } from '../table/table.component';
import { Style, mergeStyle } from './outline-table.module.css';

interface Props {
  style?: Style,
  children: ReactElement[]
}

export function OutlineTable(props: Props) {

  const {
    style: customStyle,
    children
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <OutlineCard className={style.outlineCard}>
      <Table style={style}>
        {children}
      </Table>
    </OutlineCard>
  );
}
