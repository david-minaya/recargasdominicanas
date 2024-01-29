import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FillButton } from './fill-button.component';

export default {
  title: 'Components/FillButton',
  component: FillButton
} as ComponentMeta<typeof FillButton>;

const Template: ComponentStory<typeof FillButton> = (args) => (
  <FillButton {...args}/>
);

export const Default = Template.bind({});
Default.args = { 
  text: 'Fill Button'
};
