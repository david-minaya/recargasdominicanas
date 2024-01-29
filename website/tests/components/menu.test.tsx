import React from 'react';
import { shallow, mount } from 'enzyme';
import { Menu } from '../../components/menu';

it('render menu component', () => {
  const menu = mount(<Menu/>);
  const option = menu.find('.option');
  const button = menu.find('.button');
  expect(option.text()).toBe('Preguntas frecuentes');
  expect(button.text()).toBe('Solicitar Sistema');
});

it('snapshot', () => {
  const menu = shallow(<Menu/>);
  expect(menu).toMatchSnapshot();
});
