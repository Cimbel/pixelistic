import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FeedLine } from './FeedLine';

enzyme.configure({ adapter: new Adapter() });

describe('FeedLine component', () => {
  const props = {
    nickname: 'Andrew',
    user: { _id: '1' },
    posts: [ { 
      _id: '1',
      type: 'feed'
    } ],
  };
  const wrapper = shallow(<FeedLine {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.feed-line')).toHaveLength(1);

    wrapper.setProps({ posts: [] });
    expect(wrapper.find('.feed-line')).toHaveLength(0);
    expect(wrapper.find('.start-page')).toHaveLength(1);
    expect(wrapper.find('.welcome-title')).toHaveLength(1);
    expect(wrapper.find('.social-name')).toHaveLength(1);
  });
});
