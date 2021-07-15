import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UsersCountBar from './UsersCountBar';

enzyme.configure({ adapter: new Adapter() });

describe('UsersCountBar component', () => {
  const props = { 
    users: [ 
      { _id: '0', nickname: 'Ford' },
      { _id: '2', nickname: 'Wendy' }
    ]  
  };
  const wrapper = shallow(<UsersCountBar {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.count-bar')).toHaveLength(1);    
    expect(wrapper.find('.count-bar_item')).toHaveLength(3);    
    expect(wrapper.find('.count-bar_item-heading')).toHaveLength(3);
    expect(wrapper.find('.count-bar_icon')).toHaveLength(3);
    expect(wrapper.find('.count-bar_suspended-icon')).toHaveLength(1);
    expect(wrapper.find('.count-bar_active-icon')).toHaveLength(1);
    expect(wrapper.find('.count-bar_total-icon')).toHaveLength(1);
    expect(wrapper.find('.count-bar_item-title')).toHaveLength(3);
    expect(wrapper.find('.count-bar_item-number')).toHaveLength(3);
  });
});
