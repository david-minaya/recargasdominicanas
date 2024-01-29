import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '../text/text.component';

export default {
  title: 'Components/Text',
  component: Text,
  args: {
    text: 'Recargas Dominicanas'
  }
} as ComponentMeta<typeof Text>;

export const Default: ComponentStory<typeof Text> = (args) => (
  <Text {...args}/>
);
