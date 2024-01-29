import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DetailItem } from './detail-item.component';

const meta: ComponentMeta<typeof DetailItem> = {
  title: 'Components/DetailItem',
  component: DetailItem,
  args: {
    title: 'Télefono',
    text: '(809) 606-5924'
  }
};

const Default: ComponentStory<typeof DetailItem> = (args) => (
  <DetailItem {...args}/>
);

export default meta;
export { Default };
