import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Option } from './option.component';

export default {
  title: 'Components/Option',
  component: Option,
  args: {
    icon: 'receipt',
    text: 'Reimprimir recibo',
    hiddeIcon: false
  }
} as ComponentMeta<typeof Option>;

export const Default: ComponentStory<typeof Option> = (args) => (
  <Option {...args}/>
);
