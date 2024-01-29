import React from 'react';
import { IDataPlan } from '@recargas-dominicanas/core/types';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { Modal, ModalContent, ModalToolbar } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './data-plans-modal.module.css';

interface Props {
  open: boolean;
  dataPlans?: IDataPlan[];
  style?: Style;
  onClick: (dataPlan: IDataPlan) => void;
  onClose: () => void;
}

export function DataPlansModal(props: Props) {

  const {
    open,
    dataPlans,
    style: customStyle,
    onClick,
    onClose
  } = props;

  const style = mergeStyle(customStyle);

  function handleClick(dataPlan: IDataPlan) {
    onClick(dataPlan);
    handleClose();
  }

  function handleClose() {
    onClose();
  }

  return (
    <Modal 
      open={open}
      style={style.modal}
      overlayEnterAnimation={false}
      onClose={handleClose}>
      <ModalToolbar
        style={style.modalToolbar} 
        title='Planes de datos' 
        onClose={handleClose}/>
      <ModalContent className={style.modalContent}>
        {dataPlans?.map(dataPlan => 
          <div 
            key={dataPlan.id}
            className={style.item} 
            onClick={() => handleClick(dataPlan)}>
            <div className={style.itemTitle}>{dataPlan.name}</div>
            <div className={style.itemPrice}>{formatCurrency(dataPlan.price)}</div>
            <div className={style.itemLine}/>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
