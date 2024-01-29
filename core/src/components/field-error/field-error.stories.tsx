import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FieldError } from './field-error.component';

export default {
  title: 'Components/FieldError',
  component: FieldError,
  args: {
    message: 'Campo invalido'
  }
} as ComponentMeta<typeof FieldError>;

export const Default: ComponentStory<typeof FieldError> = (args) => (
  <FieldError {...args}/>
);
