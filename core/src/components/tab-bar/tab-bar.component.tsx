import React, { cloneElement, ReactElement, useState } from 'react';
import { Style, mergeStyle } from './tab-bar.module.css';
import clsx from 'clsx';

interface Props {
  children: ReactElement[],
  style?: Style,
  onTabClick?: (tab: any) => void
}

export function TabBar(props: Props) {

  const { 
    children,
    style: customStyle,
    onTabClick
  } = props;

  const style = mergeStyle(customStyle);
  const [tabIndex, setTabIndex] = useState(0);

  function handleTabClick(index: number, prop: any) {
    return () => {
      setTabIndex(index);
      if (onTabClick) {
        onTabClick({ index, name: prop.title, tag: prop.tag });
      }
    };
  }

  return (
    <div className={style.container}>
      {
        children.map((tab, index) => (
          cloneElement(tab, {
            key: index,
            selected: index === tabIndex,
            style: {
              ...style.tab,
              container: clsx(style.tab.container, tab.props?.style?.container),
              title: clsx(style.tab.title, tab.props?.style?.title),
              indicator: clsx(style.tab.indicator, tab.props?.style?.indicator)
            },
            onClick: handleTabClick(index, tab.props)
          })
        ))
      }
    </div>
  );
}
