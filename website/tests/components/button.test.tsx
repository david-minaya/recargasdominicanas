import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../../components/button';

it('click TextButton', () => {
  const handleClick = jest.fn();
  const wrapper = shallow(<Button onClick={handleClick}/>);
  wrapper.simulate('click');
  expect(handleClick).toHaveBeenCalled();
});

describe('render TextButton', () => {

  it('render with the default text', () => {
    const wrapper = shallow(<Button/>);
    expect(wrapper.text()).toBe('Button');
  });
  
  it('render with custom text', () => {
    const wrapper = shallow(<Button text='Text Button'/>);
    expect(wrapper.text()).toBe('Text Button');
  });
});

describe('TextButton snapshots', () => {
  
  it('snapshot with the default text', () => {
    const wrapper = shallow(<Button/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('snapshot with custom text', () => {
    const wrapper = shallow(<Button text='Text Button'/>);
    expect(wrapper).toMatchSnapshot();
  });
});
