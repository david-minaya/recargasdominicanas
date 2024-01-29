import clsx from 'clsx';
import React, { ReactNode, createContext, useCallback, useRef, useState } from 'react';
import { Icon, Menu } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './drop-down-button.module.css';

export const DropDownButtonContext = createContext({ onClose: () => {} });

interface Props {
  className?: Style;
  icon: string;
  title: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function DropDownButton(props: Props) {

  const {
    className,
    icon,
    title,
    children,
    onClick
  } = props;

  const style = mergeStyle(className);
  const menuIconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const onClose = useCallback(() => {
    setOpenMenu(false);
  }, []);

  return (
    <div className={style.container}>
      <div 
        className={style.button}
        onClick={onClick}>
        <Icon 
          className={style.icon} 
          icon={icon}/>
        <span 
          className={clsx(style.title)}>
          {title}
        </span>
      </div>
      <Icon 
        className={style.iconRight} 
        icon='expand_more'
        iconRef={menuIconRef} 
        onClick={() => setOpenMenu(true)}/>
      <Menu 
        style={style.menu}
        open={openMenu} 
        anchor={menuIconRef}
        top={8}
        onClose={() => setOpenMenu(false)}>
        <DropDownButtonContext.Provider value={{ onClose }}>
          {children}
        </DropDownButtonContext.Provider>
      </Menu>
    </div>
  );
}
