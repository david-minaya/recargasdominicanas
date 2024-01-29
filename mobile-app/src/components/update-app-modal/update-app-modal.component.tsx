import React from 'react';
import { IAppRelease } from '@recargas-dominicanas/core/types';
import { style } from './update-app-modal.module.css';

import { 
  Modal, 
  ModalToolbar, 
  ModalContent,
  OutlineButton
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  appRelease?: IAppRelease;
  onDownloadUpdate: () => void;
}

export function UpdateAppModal(props: Props) {

  const {
    open,
    appRelease,
    onDownloadUpdate
  } = props;

  if (!appRelease) return null;

  return (
    <Modal 
      open={open}
      style={style.modal}>
      <ModalToolbar
        style={style.modalToolbar} 
        title='Actualización disponible'/>
      <ModalContent className={style.modalContent}>
        <span className={style.version}>
          Novedades de la versión v{appRelease.appVersion.version}
        </span>
        <div className={style.releaseNotes}>
          {appRelease.releaseNotes?.map(releaseNote => 
            <div
              key={releaseNote.id}
              className={style.releaseNote}>
              <li className={style.releaseNoteTitle}>
                {releaseNote.title}
              </li>
              <span className={style.releaseNoteDescription}>
                {releaseNote.description}
              </span>
            </div>
          )}
        </div>
        <OutlineButton
          style={style.button}
          text='Descargar actualización'
          onClick={onDownloadUpdate}/>
      </ModalContent>
    </Modal>
  );
}
