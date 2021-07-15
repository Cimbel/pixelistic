import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';

enzyme.configure({ adapter: new Adapter() });

describe('Header render', () => {
  const props = {
    user:{
      nickname:'vasa'
    }
  }
  const wrapper = shallow(<Header {...props}/>);
  
  it('renders correctly', () => {
    expect(wrapper.find('.header')).toHaveLength(1);
  });

  it('opens and closes header menu', () => {
    expect(wrapper.instance().state.open).toEqual(false);
    wrapper.find('.menu-btn').simulate('click');
    expect(wrapper.instance().state.open).toEqual(true);
    wrapper.find('.menu-btn').simulate('click');
    expect(wrapper.instance().state.open).toEqual(false);
  });

  it('renders logo', () => {
    expect(wrapper.find('.logo')).toHaveLength(1);
  });
});
