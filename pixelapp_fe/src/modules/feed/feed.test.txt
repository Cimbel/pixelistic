import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Feed } from './Feed';

enzyme.configure({ adapter: new Adapter() });

describe('Feed component', () => {
  const props = {
    users: [],
    handleFavorite: jest.fn(),
    user: {
      nickname: 'Andrew'
    },
    posts: []
  };
  const wrapper = shallow(<Feed {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.feed')).toHaveLength(1);
  });
});
