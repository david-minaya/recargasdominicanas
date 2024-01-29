import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Header } from '../header/header.component';
import logo from '../../../images/recargas_dominicanas.svg';

const meta: ComponentMeta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    logo: logo,
    title: 'Recargas Dominicanas',
    name: 'David Minaya, Administrador'
  }
};

const Default: ComponentStory<typeof Header> = (args) => (
  <Header {...args}/>
);

export default meta;
export { Default };
