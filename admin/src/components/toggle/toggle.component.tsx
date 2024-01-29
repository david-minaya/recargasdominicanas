import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Style, mergeStyle } from './toggle.module.css';

interface Props {
  on?: boolean;
  className?: Style;
  onChange?: (on: boolean) => void;
}

export function Toggle(props: Props) {

  const {
    on: initialOn = false,
    className,
    onChange
  } = props;

  const style = mergeStyle(className);
  const [on, setOn] = useState(initialOn);

  useEffect(() => {
    setOn(initialOn);
  }, [initialOn]);

  function handleClick() {
    onChange?.(!on);
    setOn(state => !state);
  }

  return (
    <div 
      className={clsx(style.container, on && style.containerOn)}
      onClick={handleClick}>
      <div className={clsx(style.thumb, on && style.thumbOn)}/>
    </div>
  );
}
