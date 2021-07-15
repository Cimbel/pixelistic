import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MinimizedPost  from './MinimizedPost';

Enzyme.configure({ adapter: new Adapter() });

const props =  {
  img: 'img.png',
  likes: 1,
  comments: 2
}

describe('render component', () => {
  const wrapper = shallow(<MinimizedPost {...props}/>);

  it('should render static components', () => {
    expect(wrapper.find(".user-image")).toHaveLength(1);
    expect(wrapper.find(".photo-wrapper")).toHaveLength(1);
    expect(wrapper.find(".photo-info")).toHaveLength(1);
    expect(wrapper.find(".post-info")).toHaveLength(2);
  })
});
