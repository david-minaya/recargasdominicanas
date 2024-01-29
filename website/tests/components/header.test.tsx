import React from 'react';
import { mount } from 'enzyme';
import { Header } from '../../components/header';

describe('render header component', () => {
  
  it('render mobile version', () => {
    mockMatchMedia(true);
    const wrapper = mount(<Header/>);
    const title = wrapper.find('.title');
    const menuButton = wrapper.find('.menuButton');
    expect(title.text()).toBe('Recargas Dominicanas');
    expect(menuButton.exists()).toBeTruthy();
  });
  
  it('open menu on the mobile version', () => {
    mockMatchMedia(true);
    const wrapper = mount(<Header/>);
    const menuButton = wrapper.find('.menuButton').first();
    menuButton.simulate('click');
    const menu = wrapper.find('.menu');
    expect(menu.exists()).toBeTruthy();
  });
  
  it('render desktop version', () => {
    mockMatchMedia(false);
    const wrapper = mount(<Header/>);
    const menu = wrapper.find('.menu');
    expect(menu.exists).toBeTruthy();
  });
});

describe('snapshot', () => {

  it('mobile version', () => {
    mockMatchMedia(true);
    const wrapper = mount(<Header/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('mobile version with the menu opened', () => {
    mockMatchMedia(true);
    const wrapper = mount(<Header/>);
    const menuButton = wrapper.find('.menuButton').first();
    menuButton.simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('desktop version', () => {
    mockMatchMedia(false);
    const wrapper = mount(<Header/>);
    expect(wrapper).toMatchSnapshot();
  });
});

function mockMatchMedia(isMatch: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({ 
      matches: isMatch,
      addListener: jest.fn() 
    })),
  });
}
