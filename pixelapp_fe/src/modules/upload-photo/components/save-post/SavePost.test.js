import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SavePost }  from './SavePost';
import mockStore from '../../../../__mocks__/redux-mock-store';

const initialState = {
  error: false,
  errorMessage: '',
  successMessage: '',
  currentSessionPosts: [],
  wasLoadedFirstTime: false,
  isLoading: false
};

const store =  mockStore(initialState);
Enzyme.configure({ adapter: new Adapter() });

const props = {
  user: { nickname: 'Max Jester' },
  photo: { 
    current: { 
      toDataURL : jest.fn() 
    }
  },
  onCloseSaveModal: jest.fn()
}

describe('render component', () => {
 
  const wrapper = shallow(<SavePost 
    store = {store}
    {...props}
    />);

  it('should render static components', () => {
    expect(wrapper.find('.field')).toHaveLength(1);
    expect(wrapper.find('.post-info')).toHaveLength(1);
    expect(wrapper.find('.save-post')).toHaveLength(1);
    expect(wrapper.find('.input')).toHaveLength(1);
    expect(wrapper.find('.save-btn')).toHaveLength(1);
  });

  it('should render dynamic components', () => {
    wrapper.setState({ savingStarted: true });
    expect(wrapper.find('.save-btn')).toHaveLength(0);
    wrapper.setState({ savingStarted: false });
    expect(wrapper.find('.save-btn')).toHaveLength(1);
  });
})

describe('functionality', () => {
  const wrapper = shallow(<SavePost 
    store = {store}
    {...props}
    postAddPost = {jest.fn()}
  />);

  it('should change descripton', () => {
    const changeDescEvent = {
      target: {
        value: 'My first photo'
      }
    }
    wrapper.find('.input').simulate('change', changeDescEvent);
    expect(wrapper.instance().state.description).toEqual('My first photo');

    wrapper.setState({ description: '' });
    changeDescEvent.key = 'Enter';
    expect(wrapper.instance().state.description).toEqual('');
  });

  it('should change location', () => {
    wrapper.instance().changeLocation('lviv');
    expect(wrapper.instance().state.customGeolocation).toEqual('lviv');
  })

  it('should save post', () => {
    wrapper.find('.save-btn').simulate('click');
    expect(wrapper.instance().state.savingStarted).toEqual(true);
  });
})
