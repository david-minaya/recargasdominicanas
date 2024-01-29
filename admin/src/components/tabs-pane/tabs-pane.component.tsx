import React, { cloneElement, ReactElement } from 'react';
import { findChild } from '@recargas-dominicanas/core/utils';
import { OutlineCard, Switch, TabBar } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './tabs-pane.module.css';

interface Props {
  children: ReactElement[],
  style?: Style
}

export function TabsPane(props: Props) {

  const {
    children,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const tabBar = findChild(children, TabBar);
  const switchComponent = findChild(children, Switch);

  return (
    <OutlineCard className={style.container}>
      {tabBar && cloneElement(tabBar, { style: style.tabBar })}
      {switchComponent}
    </OutlineCard>
  );
}
