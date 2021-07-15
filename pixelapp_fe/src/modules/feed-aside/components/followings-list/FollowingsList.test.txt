import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FollowingsList } from './FollowingsList';

enzyme.configure({ adapter: new Adapter() });

describe('FollowingsList component', () => {
  const props = {
    followings: [
      {
        followingId: 1,
        favorite: true,
        newMessages: 2,
        status: 'online',
        nickname: 'Andrew'
      },
      {
        followingId: 2,
        favorite: false,
        newMessages: 12,
        status: 'offline',
        nickname: 'Iurii'
      },
      {
        followingId: 3,
        favorite: true,
        newMessages: 0,
        status: 'offline',
        nickname: 'Max'
      },
      {
        followingId: 4,
        favorite: false,
        newMessages: 4,
        status: 'online',
        nickname: 'Tamara'
      }
    ],
    handleFavorite: jest.fn(data => data)
  };
  
  const wrapper = shallow(<FollowingsList {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.followings-list')).toHaveLength(1);
  });

  it('handles sorting followings by favorites', () => {
    wrapper.instance().sortByFavorites();
    expect(wrapper.instance().state.mappedFollowings).toHaveLength(2);
  });

  it('handles sorting followings by received messages', () => {
    wrapper.instance().sortByReceived();
    expect(wrapper.instance().state.mappedFollowings).toHaveLength(3);
  });

  it('handles sorting followings by online status', () => {
    wrapper.instance().sortByOnline();
    expect(wrapper.instance().state.mappedFollowings).toHaveLength(2);
  });

  it('handles sorting followings by alphabet', () => {
    wrapper.instance().sortByABC();
    expect(wrapper.instance().state.mappedFollowings).toHaveLength(4);
  });

  it('maps the followings', () => {
    const followings = [{
      followingId: 3,
      favorite: true,
      newMessages: 0,
      status: 'offline',
      nickname: 'Max'
    },
    {
      followingId: 4,
      favorite: false,
      newMessages: 4,
      status: 'online',
      nickname: 'Tamara'
    }];
    wrapper.instance().mapFollowings(followings);
    expect(wrapper.instance().state.mappedFollowings).toHaveLength(2);
  });

  it('handles favorites', () => {
    expect(wrapper.instance().handleFavorite(true, 123)).toEqual({
      checked: true,
      followingInfoId: 123
    });
  });
});
