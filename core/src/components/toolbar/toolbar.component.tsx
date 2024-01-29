import React from 'react';
import { Title } from '../title/title.component';
import { Icon } from '../icon/icon.component';
import { Style, mergeStyle } from './toolbar.module.css';

interface Props {
  title: string;
  options: string[];
  onOptionClick?: (option: string) => void;
  style?: Style;
}

export function Toolbar(props: Props) {

  const {
    title,
    options,
    style: customStyle,
    onOptionClick
  } = props;

  const style = mergeStyle(customStyle);

  function handleOptionClick(option: string) {
    if (onOptionClick) onOptionClick(option);
  }

  return (
    <div className={style.container}>
      <Title style={style.title} title={title}/>
      <div className={style.menu}>
        {
          options.map(option => (
            <Icon 
              key={option}
              className={style.option} 
              icon={option}
              onClick={() => handleOptionClick(option)}/>
          ))
        }
      </div>
    </div>
  );
}
