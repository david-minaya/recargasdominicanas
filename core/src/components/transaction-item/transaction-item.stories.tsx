import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TransactionItem } from '../transaction-item/transaction-item.component';
import image from '../../../images/claro.svg';

const meta: ComponentMeta<typeof TransactionItem> = {
  title: 'Components/TransactionItem',
  component: TransactionItem,
  args: {
    transaction: {
      id: 1,
      phone: '8096065924',
      amount: 100,
      profit: 5,
      date: '2021-09-12T13:53:31.000Z',
      reference: 1,
      cancelled: true,
      product: {
        id: 0,
        name: 'Claro',
        image: image,
        type: 'Recarga',
        profit: 0,
        enabled: true,
        min: 0,
        max: 0,
        prices: [] as any
      }
    }
  }
};

const Default: ComponentStory<typeof TransactionItem> = (args) => (
  <TransactionItem {...args}/>
);

export default meta;
export { Default };
