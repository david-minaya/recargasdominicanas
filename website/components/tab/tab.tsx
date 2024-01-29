import React from 'react';
import clsx from 'clsx';
import { style } from './tab.module.css';

interface Props {
  id: number;
  title: string;
  isEnabled?: boolean;
  isSelected: boolean;
  onTabClicked: (id: number) => void;
}

export function Tab(props: Props) {

  const { 
    id, 
    title, 
    isEnabled, 
    isSelected, 
    onTabClicked 
  } = props;

  function handleTabClicked() {
    if (isEnabled) onTabClicked(id);
  }

  function center(tabElement: HTMLDivElement) {
    
    if (tabElement && isSelected) {

      const { matches } = window.matchMedia('(min-height: 400px)');
      
      tabElement.scrollIntoView({ 
        behavior: matches ? 'smooth' : undefined, 
        inline: 'center' 
      });
    }
  }

  return (
    <div 
      className={style.tab} 
      onClick={handleTabClicked} 
      ref={center}>
      <div 
        className={clsx(
          style.title, 
          !isEnabled && style.disabledTitle
        )}>
        {title}
      </div>
      <div className={clsx(
        style.indicator, 
        isSelected && style.indicatorOn
      )}/>
    </div>
  );
}
