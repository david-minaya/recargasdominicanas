import React from 'react';
import { Button } from '../button';
import { mergeStyle, Style } from './navigation-buttons.module.css';

export interface IButton {
  style?: Style;
  name?: string;
  disabled?: boolean;
  hidden?: boolean;
  onClick?: () => void;
}

interface Props {
  style?: Style;
  previousButton: IButton;
  nextButton: IButton;
}

export function NavigationButtons(props: Props) {

  const {
    style: customStyle,
    previousButton, 
    nextButton
  } = props;

  const style = mergeStyle({ 
    ...customStyle, 
    ...previousButton.style, 
    ...nextButton.style 
  });

  return (
    <div className={style.navigationButtons}>
      <Button
        text={previousButton.name}
        onClick={previousButton.onClick}
        disabled={previousButton.disabled}
        hidden={previousButton.hidden}
        style={style.previousButton} />
      <Button
        text={nextButton.name}
        onClick={nextButton.onClick}
        disabled={nextButton.disabled}
        hidden={nextButton.hidden}
        style={style.nextButton} />
    </div>
  );
}
