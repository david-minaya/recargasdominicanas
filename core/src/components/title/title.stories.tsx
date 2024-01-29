import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Title } from '../title/title.component';

const meta: ComponentMeta<typeof Title> = {
  title: 'Components/Title',
  component: Title,
  args: {
    title: 'Recargas Dominicanas'
  }
};

const Default: ComponentStory<typeof Title> = (args) => (
  <Title {...args}/>
);

const GoBackEnabled: ComponentStory<typeof Title> = (args) => (
  <Title {...args}/>
);

GoBackEnabled.args = {
  enableGoBack: true
};

export default meta;
export { Default, GoBackEnabled };
