import React from 'react'
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { LabelBottomNav } from './LabelBottomNav';

enzyme.configure({ adapter: new Adapter() });

describe('LavelBottomNav component', () => {
  const props = {
    handleABC: jest.fn(),
    handleFavorites: jest.fn(),
    handleReceived: jest.fn(),
    handleOnline: jest.fn()
  };
  
  const wrapper = shallow(<LabelBottomNav {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({
      label: 'ABC',
      value: 'ABC'
    })).toHaveLength(1);
    expect(wrapper.find({
      label: 'Favorites',
      value: 'favorites'
    })).toHaveLength(1);
    expect(wrapper.find({
      label: 'Received',
      value: 'received'
    })).toHaveLength(1);
    expect(wrapper.find({
      label: 'Online',
      value: 'online'
    })).toHaveLength(1);
    expect(wrapper.instance().state.value).toEqual('ABC');
  });

  describe('when the component is being changed', () => {
    it ('handles the change', () => {
      wrapper.instance().handleChange(null, 'Online');
      expect(wrapper.instance().state.value).toEqual('Online');
      wrapper.instance().handleChange(null, 'ABC');
      expect(wrapper.instance().state.value).not.toEqual('Online');
    });
  });
});
