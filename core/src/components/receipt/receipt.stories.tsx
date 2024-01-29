import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Receipt } from './receipt.component';
import image from '../../../images/claro.svg';
import { DetailItem } from '../detail-item/detail-item.component';

const meta: ComponentMeta<typeof Receipt> = {
  title: 'Components/Receipt',
  component: Receipt
};

const Default: ComponentStory<typeof Receipt> = () => (
  <div style={{ width: '300px' }}>
    <Receipt
      image={image}
      title='Recarga claro'>
      <DetailItem title='Telefono' text='(809) 606-5924'/>
      <DetailItem title='Monto' text='100'/>
      <DetailItem title='Fecha' text='28/04/2022'/>
    </Receipt>
  </div>
);

export default meta;
export { Default };
