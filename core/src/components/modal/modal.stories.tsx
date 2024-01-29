import React from 'react';
import image from '../../../images/claro.svg';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from './modal.component';
import { ModalActions } from '../modal-actions/modal-actions.component';
import { ModalContent } from '../modal-content/modal-content.component';
import { ModalOptions } from '../modal-options/modal-options.component';
import { Receipt } from '../receipt/receipt.component';
import { OutlineButton } from '../outline-button/outline-button.component';
import { Button } from '../button/button.component';
import { ModalToolbar } from '../modal-toolbar/modal-toolbar.component';
import { DetailItem } from '../detail-item/detail-item.component';

const meta: ComponentMeta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    open: true,
  }
};

export const WithButtons: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}>
    <ModalToolbar title='Hello world'/>
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
  </Modal>
);

export const WithOptions: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}>
    <ModalToolbar title='Hello world'/>
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
  </Modal>
);

export default meta;
