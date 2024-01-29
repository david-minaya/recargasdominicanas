import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateTime } from './datetime.component';
import { useForm } from '../../utils';
import { OutlineButton } from '../outline-button/outline-button.component';

export default {
  title: 'Components/DateTime',
  component: DateTime,
  args: {
    placeholder: 'Seleccionar fecha'
  }
} as ComponentMeta<typeof DateTime>;

export const Default: ComponentStory<typeof DateTime> = (args) => (
  <DateTime {...args}/>
);


export const Form: ComponentStory<typeof DateTime> = () => {

  const form = useForm({ datetime: '' });

  return (
    <div>
      <DateTime
        placeholder='Fecha'
        required={true}
        formField={form.fields.datetime}/>
      <OutlineButton
        text='Borrar'
        onClick={() => form.clear()}/>
      <OutlineButton
        text='Validar'
        onClick={() => form.isValid()}/>
    </div>
  );
};
