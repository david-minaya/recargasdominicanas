import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Autocomplete } from './autocomplete.component';
import { SelectOption } from '../select-option/select-option.component';
import { useForm } from '../../utils';
import { OutlineButton } from '../outline-button/outline-button.component';

export default {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  args: {
    placeholder: 'Buscar color',
    required: true
  }
} as ComponentMeta<typeof Autocomplete>;

const initialColors = [
  { color: 'red' }, 
  { color: 'green' }, 
  { color: 'black' }, 
  { color: 'white' }, 
  { color: 'yellow' }, 
  { color: 'gray' },
  { color: 'blue' }
];

export const Default: ComponentStory<typeof Autocomplete> = (args) => {

  const [colors, setColors] = useState(initialColors);
  const [color, setColor] = useState(undefined);

  function handleSearch(value?: string) {
    setColors(colors => 
      value 
        ? colors.filter(color => color.color.startsWith(value))
        : initialColors
    );
  }

  function handleChange(value: any) {
    setColor(value);
  }

  return (
    <Autocomplete 
      {...args}
      value={color}
      onSearch={handleSearch}
      onChange={handleChange}>
      {
        colors.map(color => (
          <SelectOption key={color.color} value={color} label={color.color}>
            <span>{color.color}</span>
          </SelectOption>
        ))
      }
    </Autocomplete>
  );
};

export const Form: ComponentStory<typeof Autocomplete> = (args) => {

  const form = useForm({ color: undefined });
  const [colors, setColors] = useState(initialColors);

  function handleSearch(value = '') {
    setColors(() => initialColors.filter(color => color.color.startsWith(value)));
  }

  return (
    <div>
      <Autocomplete
        {...args} 
        formField={form.fields.color}
        onSearch={handleSearch}>
        {
          colors.map((color, index) => (
            <SelectOption key={index} value={color} label={color.color}>
              <span>{color.color}</span>
            </SelectOption>
          ))
        }
      </Autocomplete>
      <OutlineButton text='Validar' onClick={() => form.isValid()}/>
      <OutlineButton text='limpiar' onClick={() => form.clear()}/>
    </div>
  );
};
