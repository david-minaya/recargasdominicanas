import React, { ReactNode } from 'react';
import { Style, mergeStyle } from './modal.module.css';

import { 
  Modal as Base,
  ModalToolbar,
  Error,
  OutlineButton, 
  FillButton, 
  ModalActions,
  ModalContent
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean,
  icon?: string,
  title: string,
  children?: ReactNode,
  error?: string,
  style?: Style,
  primaryButton?: string,
  secondaryButton?: string,
  disabledPrimaryButton?: boolean,
  disabledSecondaryButton?: boolean,
  onPrimaryClick?: () => void,
  onSecondaryClick?: () => void,
  onClose?: () => void
}

export function Modal(props: Props) {

  const {
    open,
    icon,
    title,
    children,
    error,
    style: customStyle,
    primaryButton = 'Aceptar',
    secondaryButton = 'Cancelar',
    disabledPrimaryButton = false,
    disabledSecondaryButton = false,
    onPrimaryClick,
    onSecondaryClick,
    onClose
  } = props;

  const style = mergeStyle(customStyle);
  
  style.modal = { card: `${style.modal.card} ${customStyle?.card}` };

  return (
    <Base
      style={style.modal}
      open={open}
      onClose={onClose}>
      <ModalToolbar
        icon={icon}
        title={title}
        style={style.modalToolbar}
        onClose={onClose}/>
      <ModalContent className={style.content}>
        {children}
      </ModalContent>
      <Error 
        style={style.error} 
        message={error}/>
      <ModalActions
        style={style.modalActions}>
        {onSecondaryClick &&
          <OutlineButton
            text={secondaryButton}
            disabled={disabledSecondaryButton}
            onClick={onSecondaryClick}/>
        }
        {onPrimaryClick &&
          <FillButton
            text={primaryButton}
            disabled={disabledPrimaryButton}
            onClick={onPrimaryClick}/>
        }
      </ModalActions>
    </Base>
  );
}
