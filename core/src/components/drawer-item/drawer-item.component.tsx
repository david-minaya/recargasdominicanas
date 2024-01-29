import React from 'react';
import { Icon } from '../icon/icon.component';
import { Style, mergeStyle } from './drawer-item.module.css';
import { useHistory } from 'react-router-dom';

interface Props {
  icon: string;
  title: string;
  route: string;
  state?: any;
  align: 'top' | 'bottom';
  style?: Style;
  onCloseDrawer?: () => void;
}

export function DrawerItem(props: Props) {

  const {
    icon,
    title,
    route,
    state,
    style: customStyle,
    onCloseDrawer
  } = props;

  const style = mergeStyle(customStyle);
  const history = useHistory();

  function handleClick() {

    if (history.location.pathname !== route) {
      history.replace(route, state);
    }

    onCloseDrawer?.();
  }

  return (
    <div className={style.container} onClick={handleClick}>
      <Icon className={style.icon} icon={icon}/>
      <span className={style.title}>{title}</span>
    </div>
  );
}
