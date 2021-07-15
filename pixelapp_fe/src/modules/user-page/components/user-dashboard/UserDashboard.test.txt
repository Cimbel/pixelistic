import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserDashboard from './UserDashboard';

enzyme.configure({ adapter: new Adapter() });

describe('UserDashboard component', () => {
  const props = {
    userprofile: {
        _id: '0',
        bio: 'bio',
        website: 'website',
        fullName: 'fullName',
        avatar: 'avatar',
        nickname: 'nickname'
      }
  };
  const wrapper = shallow(<UserDashboard {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.user-dashboard')).toHaveLength(1);
    expect(wrapper.find('DashboardBtn')).toHaveLength(1);
    expect(wrapper.find('.link-website').props())
            .toHaveProperty('href', 'http://website');  
  });
});
