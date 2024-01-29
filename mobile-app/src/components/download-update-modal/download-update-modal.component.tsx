import React, { useState } from 'react';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { UpdatePlugin } from '../../plugins/UpdatePlugin';
import { style } from './download-update-modal.module.css';

import { 
  Modal, 
  ModalToolbar, 
  ModalContent,
  Progress
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  onClose: () => void;
  onDownloadFailed: () => void;
}

export function DownloadUpdateModal(props: Props) {

  const {
    open,
    onClose,
    onDownloadFailed
  } = props;

  const [size, setSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [progress, setProgress] = useState(0);

  useAsyncEffect(async () => {

    if (!open) return null;

    UpdatePlugin.onDownloadStarted(totalSize => {
      setTotalSize(totalSize);
    });

    UpdatePlugin.onDownloadProgress((size, progress) => {
      setSize(size);
      setProgress(progress);
    });

    UpdatePlugin.onDownloadCompleted(() => {
      onClose();
      UpdatePlugin.install();
    });

    UpdatePlugin.onDownloadFailed(() => {
      onClose();
      onDownloadFailed();
    });

    await UpdatePlugin.download();
  }, [open]);

  return (
    <Modal 
      open={open}
      style={style.modal}>
      <ModalToolbar
        style={style.modalToolbar} 
        title='Descargando actualización'/>
      <ModalContent className={style.modalContent}>
        <span className={style.message}>
          Esto solo tomara un momento, no cierre la aplicación durante la actualización.
        </span>
        <Progress
          className={style.progress} 
          value={progress}/>
        <div className={style.downloadProgress}>
          <span>{progress}%</span>
          <span>{size} / {totalSize} mb</span>
        </div>
      </ModalContent>
    </Modal>
  );
}
