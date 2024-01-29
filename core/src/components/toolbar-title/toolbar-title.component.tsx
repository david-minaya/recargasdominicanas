import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '../icon/icon.component';
import { Text } from '../text/text.component';
import { mergeStyle, Style } from './toolbar-title.module.css';

interface Props {
  title: string;
  style?: Style;
  onGoBack?: () => void;
}

export function ToolbarTitle(props: Props) {

  const { 
    title,
    style: customStyle, 
    onGoBack
  } = props;

  const style = mergeStyle(customStyle);
  const history = useHistory();

  function handleGoBackClick() {
    if (onGoBack) {
      onGoBack();
    } else {
      history.goBack();
    }
  }

  return (
    <div className={style.container}>
      <Icon 
        className={style.icon} 
        icon='arrow_back'
        onClick={handleGoBackClick}/>
      <Text 
        className={style.title} 
        text={title}/>
    </div>
  );
}
