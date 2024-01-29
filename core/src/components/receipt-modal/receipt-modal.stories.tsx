import React from 'react';
import image from '../../../images/claro.svg';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReceiptModal } from './receipt-modal.component';
import { OutlineButton } from '../outline-button/outline-button.component';
import { ModalOptions } from '../modal-options/modal-options.component';

const meta: ComponentMeta<typeof ReceiptModal> = {
  title: 'Components/ReceiptModal',
  component: ReceiptModal,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    title: 'Recibo',
    open: true,
    transaction: {
      id: 1,
      phone: '8096065924',
      amount: 50,
      profit: 25,
      date: new Date().toDateString(),
      reference: 1,
      cancelled: false,
      product: {
        id: 0,
        name: 'Claro',
        image: image,
        type: 'Recarga',
        profit: 0,
        min: 0,
        max: 0,
        enabled: true,
        prices: [] as any
      }
    }
  }
};

export const Default: ComponentStory<typeof ReceiptModal> = (args) => (
  <ReceiptModal {...args}>
    <ModalOptions>
      <OutlineButton icon='receipt' text='Reimprimir recibo'/>
      <OutlineButton icon='close' text='Cancelar recarga'/>
    </ModalOptions>
  </ReceiptModal>
);

export default meta;
