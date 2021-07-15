import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FollowingItem } from './FollowingItem';

enzyme.configure({ adapter: new Adapter() });

describe('FollowingItem component', () => {
  const props = {
    handleFavorite: jest.fn(),
    following: {
      nickname: 'Andrew',
      status: 'online',
      newMessages: 2,
      avatar: 'https://www.google.com',
      favorite: false,
      followingInfoId: '123ba'
    }
  };
  const wrapper = shallow(<FollowingItem {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.following-item')).toHaveLength(1);
    expect(wrapper.find('.chip')).toHaveLength(1);
    expect(wrapper.find('.exp-details')).toHaveLength(1);
  });
});
