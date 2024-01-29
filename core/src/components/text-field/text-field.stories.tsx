import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextField } from './text-field.component';

const meta: ComponentMeta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    placeholder: 'Campo de texto',
    hint: 'Escriba cualquier cosa'
  }
};

const Default: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args}/>
);

export default meta;
export { Default };
