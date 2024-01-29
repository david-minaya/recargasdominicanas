import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Toolbar } from './toolbar.component';

const meta: ComponentMeta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'padded'
  },
  args: {
    title: 'Toolbar',
    options: ['refresh', 'sort']
  }
};

const Default: ComponentStory<typeof Toolbar> = (args) => (
  <Toolbar {...args}/>
);

export default meta;
export { Default };
