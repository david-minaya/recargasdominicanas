import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProductItem } from './product-item.component';
import image from '../../../images/claro.svg';

const meta: ComponentMeta<typeof ProductItem> = {
  title: 'Components/ProductItem',
  component: ProductItem,
  args: {
    product: {
      id: 0,
      type: 'Recarga',
      name: 'Claro',
      image: image,
      profit: 0,
      enabled: true,
      min: 25,
      max: 1500,
      prices: [] as any
    }
  }
};

const Default: ComponentStory<typeof ProductItem> = (args) => (
  <ProductItem {...args}/>
);

export default meta;
export { Default };
