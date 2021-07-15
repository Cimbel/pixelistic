import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserPosts  from './UserPosts';

Enzyme.configure({ adapter: new Adapter() });

const props =  {
  posts: [
    {
      _id: 1,
      image: 'img.png',
      likes: [],
      comments: []
    },
    {
      _id: 2,
      image: 'img2.png',
      likes: [],
      comments: []
    },
    {
      _id: 3,
      image: 'img3.png',
      likes: [],
      comments: []
    }
  ],
  ownPage: false,
  userId: 'ef123',
  userNickname: 'MaxJester',
}

describe('render component', () => {
  const wrapper = shallow(<UserPosts {...props}/>);
  it ('should render user images', () => {
    expect(wrapper.find('.user-posts')).toHaveLength(1);
    expect(wrapper.find('.user-images')).toHaveLength(1);
  }) 
  it ('should render empty own page', () => {
    wrapper.setProps({
      ownPage: true,
      posts: []
    })
    expect(wrapper.find('.empty-posts')).toHaveLength(1);
    expect(wrapper.find('.add-photo')).toHaveLength(1);
  }) 

  it ('should render empty user page', () => {
    wrapper.setProps({
      ownPage: false,
      posts: []
    })
    expect(wrapper.find('.empty-posts')).toHaveLength(1);
    expect(wrapper.find('.add-photo')).toHaveLength(0);
  }) 
})

describe('functionality', () => {
  const wrapper = shallow(<UserPosts {...props}/>);
  const next  = 1;
  const prev = -1;
  
  it('should open post', () => {
    wrapper.instance().openPostPage(1);
    expect(wrapper.instance().state.postOpenIndex).toEqual(0);
  })

  it('should close post', () => {
    wrapper.instance().closePostPage();
    expect(wrapper.instance().state.postOpenIndex).toEqual(-1);
  })

  it('should navigate next post', () => {
    wrapper.setState( { postOpenIndex: 0 });
    wrapper.instance().changeCurrentPost(next);
    expect(wrapper.instance().state.postOpenIndex).toEqual(1);
  })

  it('should navigate prev post', () => {
    wrapper.setState( { postOpenIndex: 1 });
    wrapper.instance().changeCurrentPost(prev);
    expect(wrapper.instance().state.postOpenIndex).toEqual(0);
  })

  it('should not navigate out of range', () => {
    wrapper.setState( { postOpenIndex: 0 });
    wrapper.instance().changeCurrentPost(prev);
    expect(wrapper.instance().state.postOpenIndex).toEqual(0);

    wrapper.setState( { postOpenIndex: 2 });
    wrapper.instance().changeCurrentPost(next);
    expect(wrapper.instance().state.postOpenIndex).toEqual(2);
  })
})
