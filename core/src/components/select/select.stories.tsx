import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './select.component';
import { OutlineButton } from '..';
import { SelectOption } from '../select-option/select-option.component';
import { useForm } from '../../utils';

export default {
  title: 'Components/Select',
  component: Select,
  args: {
    icon: 'person',
    placeholder: 'Cliente',
    required: true
  }
} as ComponentMeta<typeof Select>;

export const Default: ComponentStory<typeof Select> = (args) => {

  const [value, setValue] = useState<string>();

  function handleChange(value: any) {
    setValue(value);
  }

  return (
    <Select {...args} value={value} onChange={handleChange}>
      <SelectOption value='item-1' label='Item 1'>
        <span>Item 1</span>
      </SelectOption>
      <SelectOption value='item-2' label='Item 2'>
        <span>Item 2</span>
      </SelectOption>
      <SelectOption value='item-3' label='Item 3'>
        <span>Item 3</span>
      </SelectOption>
    </Select>
  );
};

export const Form: ComponentStory<typeof Select> = (args) => {

  const form = useForm({ value: undefined });

  return (
    <div>
      <Select 
        {...args} 
        formField={form.fields.value}>
        <SelectOption value='item-1' label='Item 1'>
          <span>Item 1</span>
        </SelectOption>
        <SelectOption value='item-2' label='Item 2'>
          <span>Item 2</span>
        </SelectOption>
        <SelectOption value='item-3' label='Item 3'>
          <span>Item 3</span>
        </SelectOption>
      </Select>
      <OutlineButton text='Validar' onClick={() => form.isValid()}/>
      <OutlineButton text='limpiar' onClick={() => form.clear()}/>
    </div>
  );
};
