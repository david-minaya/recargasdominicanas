import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { NavbarOption } from './navbar-option.component';

export default {
  title: 'Components/NavbarOption',
  component: NavbarOption,
  args: {
    icon: 'storefront'
  }
} as ComponentMeta<typeof NavbarOption>;

export const Default: ComponentStory<typeof NavbarOption> = (args) => (
  <MemoryRouter>
    <NavbarOption {...args}/>
  </MemoryRouter>
);
