import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OutlineItem } from '../outline-item/outline-item.component';

const meta: ComponentMeta<typeof OutlineItem> = {
  title: 'Components/OutlineItem',
  component: OutlineItem,
  args: {
    icon: 'copy',
    text: 'Recargas Dominicanas'
  }
};

const Default: ComponentStory<typeof OutlineItem> = (args) => (
  <OutlineItem {...args}/>
);

export default meta;
export { Default };
