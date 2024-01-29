import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalToolbar } from './modal-toolbar.component';

export default {
  title: 'Components/ModalToolbar',
  component: ModalToolbar,
  args: {
    title: 'Hello world',
    icon: 'add'
  }
} as ComponentMeta<typeof ModalToolbar>;

export const Default: ComponentStory<typeof ModalToolbar> = (args) => (
  <ModalToolbar {...args}/>
);
