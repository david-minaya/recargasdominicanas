import React from 'react';
import { Text } from '../text/text.component';
import { Icon } from '../icon/icon.component';
import { mergeStyle, Style } from './header.module.css';

interface Props {
  logo?: string;
  title: string;
  name: string;
  style?: Style;
  onOpenProfile?: () => void;
}

export function Header(props: Props) {

  const {
    logo,
    title,
    name,
    style: customStyle,
    onOpenProfile
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      <img className={style.logo} src={logo}/>
      <Text
        text={title}
        className={style.title}/>
      <div 
        className={style.user}
        onClick={onOpenProfile}>
        <Text className={style.name} text={name}/>
        <Icon className={style.icon} icon='expand_more'/>
      </div>
    </div>
  );
}
