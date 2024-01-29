import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToolbarTitle } from './toolbar-title.component';

export default {
  title: 'Components/ToolbarTitle',
  component: ToolbarTitle,
  args: {
    title: 'Recargas Dominicanas'
  }
} as ComponentMeta<typeof ToolbarTitle>;

export const Default: ComponentStory<typeof ToolbarTitle> = (args) => (
  <ToolbarTitle {...args}/>
);
