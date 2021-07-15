import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FeedAside } from './FeedAside';

enzyme.configure({ adapter: new Adapter() });

describe('FeedAside component', () => {
  const props = {
    users: [
      {
        nickname: "John",
        following: true
      },
      {
        nickname: "Jessy",
        following: false
      }
    ],
    handleFavorite: jest.fn(),
    user: {
      nickname: 'Andrew',
      avatar: 'https://www.google.com'
    }
  };
  const wrapper = shallow(<FeedAside {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.feed-aside')).toHaveLength(1);
  });
});
