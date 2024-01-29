import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navbar } from './navbar.component';
import { NavbarOption } from '../navbar-option/navbar-option.component';
import { MemoryRouter } from 'react-router';

const meta: ComponentMeta<typeof Navbar> = {
  title: 'Components/NavBar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen'
  }
};

const Default: ComponentStory<typeof Navbar> = () => (
  <MemoryRouter>
    <Navbar>
      <NavbarOption align='top' icon='dashboard' route='/home'/>
      <NavbarOption align='top' icon='groups'/>
      <NavbarOption align='top' icon='person_add'/>
      <NavbarOption align='bottom' icon='settings'/>
    </Navbar>
  </MemoryRouter>
);

export default meta;
export { Default };
