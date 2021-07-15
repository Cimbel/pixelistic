import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminInfoPanel from './AdminInfoPanel';

enzyme.configure({ adapter: new Adapter() });

describe('AdminInfoPanel component', () => {
  const props = {
    admin: { _id: '1', nickname: 'Robert' }, 
    users: [ 
      { _id: '0', nickname: 'Ford' },
      { _id: '2', nickname: 'Wendy' }
    ]  
  };
  const wrapper = shallow(<AdminInfoPanel {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.admin-info-panel')).toHaveLength(1);
    expect(wrapper.find('.admin-info-panel_profile')).toHaveLength(1);
    expect(wrapper.find('.admin-info-panel_avatar')).toHaveLength(1);
    expect(wrapper.find('.admin-info-panel_title')).toHaveLength(1);    
  });
});
