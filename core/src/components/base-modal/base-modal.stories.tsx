import React from 'react';
import image from '../../../images/claro.svg';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OutlineButton } from '../outline-button/outline-button.component';
import { Button } from '../button/button.component';
import { Receipt } from '../receipt/receipt.component';
import { BaseModal } from './base-modal.component';
import { ModalContent } from '../modal-content/modal-content.component';
import { ModalOptions } from '../modal-options/modal-options.component';
import { ModalActions } from '../modal-actions/modal-actions.component';
import { DetailItem } from '../detail-item/detail-item.component';

const meta: ComponentMeta<typeof BaseModal> = {
  title: 'Components/BaseModal',
  component: BaseModal,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    title: 'Receipt Modal',
    open: true,
  }
};

export const ModalWithOptions: ComponentStory<typeof BaseModal> = (args) => (
  <BaseModal {...args}>
    <ModalContent>
      <Receipt
        title='Recarga claro'
        image={image}>
        <DetailItem title='Telefono' text='(809) 606-5924'/>
        <DetailItem title='Monto' text='100 RD$'/>
        <DetailItem title='Referencia' text='ASD856DS5ES'/>
      </Receipt>
    </ModalContent>
    <ModalOptions>
      <OutlineButton icon='receipt' text='Reimprimir recibo'/>
      <OutlineButton icon='close' text='Cancelar recarga'/>
    </ModalOptions>
  </BaseModal>
);

export const ModalWithButtons: ComponentStory<typeof BaseModal> = (args) => (
  <BaseModal {...args}>
    <ModalContent>
      <Receipt
        title='Recarga claro'
        image={image}>
        <DetailItem title='Telefono' text='(809) 606-5924'/>
        <DetailItem title='Monto' text='100 RD$'/>
        <DetailItem title='Referencia' text='ASD856DS5ES'/>
      </Receipt>
    </ModalContent>
    <ModalActions>
      <Button text='Cancelar'/>
      <OutlineButton text='Aceptar'/>
    </ModalActions>
  </BaseModal>
);

export default meta;
