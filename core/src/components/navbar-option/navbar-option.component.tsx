import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../icon/icon.component';
import { Style, mergeStyle } from './navbar-option.module.css';

interface Props { 
  icon: string,
  route: string,
  label?: string,
  align?: 'top' | 'bottom',
  style?: Style
}

export function NavbarOption(props: Props) {

  const { 
    icon,
    label,
    route,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const [showLabel, setShowLabel] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const onMouseOver = useMemo(() => {

    let id: NodeJS.Timeout;
    
    return () => {
    
      clearTimeout(id);
    
      id = setTimeout(() => {
        setShowLabel(true);
      }, 800);

      setTimeoutId(id);
    };
  }, []);

  function onMouseOut() {
    setShowLabel(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  return (
    <NavLink 
      to={route} 
      exact={true}
      className={style.container} 
      activeClassName={style.active}
      onClick={onMouseOut}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}>
      <Icon 
        icon={icon} 
        className={style.icon}/>
      <div 
        className={style.indicator}/>
      <div 
        className={clsx(style.label, label && showLabel && style.showLabel)}>
        {label}
      </div>
    </NavLink>
  );
}
