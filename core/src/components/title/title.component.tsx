import React from 'react';
import { Icon } from '../icon/icon.component';
import { Text } from '../text/text.component';
import { mergeStyle, Style } from './title.module.css';

interface Props {
  title: string;
  enableGoBack?: boolean; 
  style?: Style;
  onGoBack?: () => void;
}

export function Title(props: Props) {

  const { 
    title,
    enableGoBack = false,
    style: customStyle, 
    onGoBack
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      {enableGoBack &&
        <Icon 
          className={style.icon} 
          icon='arrow_back'
          onClick={onGoBack}/>
      }
      <Text className={style.title} text={title}/>
    </div>
  );
}
