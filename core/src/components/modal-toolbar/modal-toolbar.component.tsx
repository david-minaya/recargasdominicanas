import React from 'react';
import { Icon } from '../icon/icon.component';
import { Style, mergeStyle } from './modal-toolbar.module.css';

interface Props {
  icon?: string,
  title: string,
  style?: Style,
  onClose?: () => void
}

export function ModalToolbar(props: Props) {

  const {
    icon,
    title,
    style: customStyle,
    onClose
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      {icon && <Icon className={style.icon} icon={icon}/>}
      <span className={style.title}>{title}</span>
      {onClose && <Icon className={style.close} icon='close' onClick={onClose}/>}
    </div>
  );
}
