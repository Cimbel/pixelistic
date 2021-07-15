import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UploadPhoto  from './UploadPhoto';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  user: {
    nickname: 'MaxJester',
    posts: []
  }
}

describe('render component', () => {
  const wrapper = shallow(<UploadPhoto {...props}/>);

  it('should render empty photo layoout', () => {
    wrapper.setState({ photo: null });
    expect(wrapper.find('.photo-upload')).toHaveLength(1);
    expect(wrapper.find('.empty-photo')).toHaveLength(1);
    expect(wrapper.find('.file-input')).toHaveLength(1);
  })

  it('should render uploaded photo', () => {
    wrapper.setState({ 
      photo: 'imgbase64', 
      photoIsDisplayed: true 
    });
    expect(wrapper.find('.photo-upload')).toHaveLength(1);
    expect(wrapper.find('.post-creator')).toHaveLength(1);
    expect(wrapper.find('.photo')).toHaveLength(1);
    expect(wrapper.find('.photo-panel')).toHaveLength(1);
    expect(wrapper.find('.panel-fix')).toHaveLength(1);
    expect(wrapper.find('.fix')).toHaveLength(1);
    expect(wrapper.find('.photo-title')).toHaveLength(1);
    expect(wrapper.find('.title')).toHaveLength(1);
    expect(wrapper.find('.close-photo-btn')).toHaveLength(1);
    expect(wrapper.find('.canvas-cont')).toHaveLength(1);
    expect(wrapper.find('.canvas')).toHaveLength(1);    
  });

})

describe('functionality', () => {
  const wrapper = shallow(<UploadPhoto {...props} />);
  
  wrapper.setState({ 
    photo: 'imgbase64', 
    photoIsDisplayed: true 
  });

  it('should open/close save panel', () => {
    wrapper.find('.next-btn').simulate('click');
    expect(wrapper.instance().state.saveOpen).toEqual(true);

    wrapper.instance().closeSaveModal();
    expect(wrapper.instance().state.saveOpen).toEqual(false);
  })

  it('should close photo upload', () => {
    wrapper.find('.close-photo-btn').simulate('click');
    expect(wrapper.instance().state.photoIsDisplayed).toEqual(false);
    expect(wrapper.instance().state.photo).toEqual(null);
  })
})
