import React, { useContext } from 'react';
import { Option } from '@recargas-dominicanas/core/components';
import { DropDownButtonContext } from '../drop-down-button/drop-down-button.component';
import { style } from './drop-down-option.module.css';

interface Props {
  title: string;
  onClick?: () => void;
}

export function DropDownOption(props: Props) {

  const {
    title,
    onClick
  } = props;

  const dropDownButton = useContext(DropDownButtonContext);

  function handleClick() {
    onClick?.();
    dropDownButton.onClose();
  }

  return (
    <Option 
      style={style.option} 
      hiddeIcon={true} 
      text={title}
      onClick={handleClick}/>
  );
}
