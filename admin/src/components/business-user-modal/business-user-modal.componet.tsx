import React, { Fragment, useMemo, useState } from 'react';
import { copy } from '@recargas-dominicanas/core/utils';
import { IAccessToken, IBusinessUser } from '@recargas-dominicanas/core/types';
import { Modal } from '../modal/modal.component';
import { Icon, OutlineButton } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './business-user-modal.module.css';
import { AccessTokenApi } from '@recargas-dominicanas/core/api';

interface Props {
  open: boolean,
  title: string,
  businessUser: IBusinessUser,
  style?: Style,
  onClose: () => void
}

export function BusinessUserModal(props: Props) {

  const {
    open,
    title,
    businessUser,
    style: customStyle,
    onClose
  } = props;

  if (!open) return null;

  const style = mergeStyle(customStyle);
  const [accessToken, setAccessToken] = useState<IAccessToken>(businessUser?.user?.accessToken);
  const isExpired = useMemo(() => Date.now() > Date.parse(accessToken?.expirationDate), [accessToken]);

  async function handleCopyLink() {
    await copy(`${process.env.WEB_APP_DOMAIN}/create-password/${accessToken.token}`);
  }

  async function handleUpdateLink() {
    setAccessToken(await AccessTokenApi.update(accessToken.id));
  }

  return (
    <Modal
      open={true}
      style={style.modal}
      title={title}
      secondaryButton='Aceptar'
      onClose={onClose}
      onSecondaryClick={onClose}>
      <div className={style.item}>
        <span className={style.itemTitle}>{businessUser.name}</span>
        <span className={style.username}>{businessUser.userName}</span>
      </div>
      {businessUser.state === 'ACTIVATED' &&
        <Fragment>
          <div className={style.stateTitle}>Estado</div>
          <div className={style.stateActivated}>Activado</div>
        </Fragment>
      }
      {businessUser.state === 'DISABLED' &&
        <Fragment>
          <div className={style.stateTitle}>Estado</div>
          <div className={style.stateDisabled}>Desactivado</div>
        </Fragment>
      }
      {accessToken &&
        <Fragment>
          <span className={style.title}>Enlace de activacion {isExpired && 'expirado'}</span>
          <div className={style.activationLink}>
            <span className={style.link}>
              {process.env.WEB_APP_DOMAIN}/create-password/{accessToken.token}
            </span>
            <Icon 
              className={style.icon} 
              icon='copy'
              onClick={handleCopyLink}/>
          </div>
          {isExpired &&
            <OutlineButton
              style={style.updateLinkButton} 
              text='Actualizar enlace'
              onClick={handleUpdateLink}/>
          }
        </Fragment>
      }
    </Modal>
  );
}
