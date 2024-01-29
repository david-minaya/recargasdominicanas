import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './button.component';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}/>
);

export const Normal = Template.bind({});
Normal.args = { 
  text: 'Normal Button'
};

export const Icon = Template.bind({});
Icon.args = {
  text: 'Icon Button',
  icon: 'storefront'
};
