import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextArea } from './text-area.component';

const meta: ComponentMeta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  args: {
    placeholder: 'Campo de texto',
    hint: 'Escriba cualquier cosa'
  }
};

const Default: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args}/>
);

export default meta;
export { Default };
