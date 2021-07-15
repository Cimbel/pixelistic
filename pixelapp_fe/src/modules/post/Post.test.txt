import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Post } from './Post';

enzyme.configure({ adapter: new Adapter() });

describe('Post component', () => {
  const props = {
    post: {
      author: {
        nickname: 'John',
        avatar: 'http://link.com',
        _id: '123123'
      },
      geolocation: 'Lviv',
      image: '/imgs/car',
      comments: [],
      likes: [],
      _id: '1234',
      description: 'nice pic',
      timestamp: 1242134321
    },
    nickname: 'Andrew',
    userId: '123'
  };
  const wrapper = shallow(<Post {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.post')).toHaveLength(1);
  });
});
