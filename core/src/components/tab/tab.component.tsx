import React from 'react';
import clsx from 'clsx';
import { Style, mergeStyle } from './tab.module.css';

interface Props {
  title: string,
  tag?: string,
  disabled?: boolean,
  selected?: boolean,
  style?: Style,
  onClick?: (tag?: string) => void
}

export function Tab(props: Props) {

  const { 
    tag, 
    title, 
    disabled = false, 
    selected = false, 
    style: customStyle,
    onClick 
  } = props;

  const style = mergeStyle(customStyle);

  function handleClick() {
    if (!disabled && onClick) onClick(tag);
  }

  function center(tabElement: HTMLDivElement) {
    
    if (tabElement && selected) {

      const { matches } = window.matchMedia('(min-height: 400px)');
      
      tabElement.scrollIntoView({ 
        behavior: matches ? 'smooth' : undefined, 
        inline: 'center' 
      });
    }
  }

  return (
    <div 
      className={style.container} 
      onClick={handleClick} 
      ref={center}>
      <div 
        className={clsx(
          style.title, 
          disabled && style.disabledTitle
        )}>
        {title}
      </div>
      <div className={clsx({
        [style.indicator]: true,
        [style.indicatorOn]: !disabled && selected 
      })}/>
    </div>
  );
}
