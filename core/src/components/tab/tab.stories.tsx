import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tab } from './tab.component';

export default {
  title: 'Components/Tab',
  component: Tab,
  args: {
    title: 'Recargas Dominicanas',
    disabled: false,
    selected: false
  }
} as ComponentMeta<typeof Tab>;

export const Default: ComponentStory<typeof Tab> = (args) => (
  <Tab {...args}/>
);
