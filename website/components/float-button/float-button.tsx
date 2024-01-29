import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMediaQuery } from '../../hooks';
import { mergeStyle, Style } from './float-button.module.css';

interface props {
  style?: Style;
  icon: string;
  text: string;
  isVisible?: boolean;
  onClick?: () => void;
}

export function FloatButton(props: props) {

  const {
    style: customStyle, 
    icon, 
    text, 
    isVisible = true, 
    onClick 
  } = props;

  const style = mergeStyle(customStyle);
  const isPointerDevice = useMediaQuery('(pointer: fine)');
  const [isCollapseText, setIsCollapseText] = React.useState(false);
  
  return (
    <CSSTransition
      in={isVisible}
      timeout={400}
      classNames={style.animation}>
      <div 
        className={style.container} 
        onClick={onClick}
        onMouseEnter={() => setIsCollapseText(isPointerDevice && true)}
        onMouseLeave={() => setIsCollapseText(isPointerDevice && false)}>
        <CSSTransition 
          in={isCollapseText}
          timeout={600}
          classNames={style.textAnimation}>
          <div className={style.text}>
            <span>{text}</span>
          </div>
        </CSSTransition>
        <div className={style.button}>
          <div className={style.icon}>{icon}</div>
        </div>
      </div>
    </CSSTransition>
  );
}
