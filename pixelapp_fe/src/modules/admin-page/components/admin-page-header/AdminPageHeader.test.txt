import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AdminPageHeader } from './AdminPageHeader';

enzyme.configure({ adapter: new Adapter() });

describe('AdminPageHeader component', () => {
  const props = {
    user: { _id: '0', nickname: 'Ford' },
    onSignOut: jest.fn()
  };

  const wrapper = shallow(<AdminPageHeader {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.admin-page-header')).toHaveLength(1);
    expect(wrapper.find('.admin-page-header_title')).toHaveLength(1);
    expect(wrapper.find('.admin-page-header_menu-icon')).toHaveLength(1);    
  });

  it('should handle toggle event of menu button', () => {
    wrapper.instance().handleToggle();
    expect(wrapper.instance().state.open).toEqual(true);
  });
  
});
