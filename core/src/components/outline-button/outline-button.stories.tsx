import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OutlineButton } from './outline-button.component';

export default {
  title: 'Components/OutlineButton',
  component: OutlineButton
} as ComponentMeta<typeof OutlineButton>;

const Template: ComponentStory<typeof OutlineButton> = (args) => (
  <OutlineButton {...args}/>
);

export const Normal = Template.bind({});
Normal.args = { 
  text: 'Normal Outline Button'
};

export const Icon = Template.bind({});
Icon.args = {
  text: 'Icon Outline Button',
  icon: 'storefront'
};
