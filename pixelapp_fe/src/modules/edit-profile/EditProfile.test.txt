import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { EditProfile } from './EditProfile';

enzyme.configure({ adapter: new Adapter() });

describe('EditProfile component', () => {
  const props = {
    match: { 
      params: { 
        nickname : 'nickname' 
      } 
    },
    user: {
      _id: '0',
      avatar: 'avatar',
      fullName: 'fullName',
      nickname: 'nickname',
      website: 'website',
      bio: 'bio' 
    }
  };
  const wrapper = shallow(<EditProfile {...props} />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.edit-profile')).toHaveLength(1);

    //onChange succcess
    expect(wrapper.instance().state.fullName).toEqual('fullName');
    wrapper.find('#inp-name').simulate('change', {target: {value: 'fullNameChange', name: 'fullName'} });
    expect(wrapper.instance().state.fullName).toEqual('fullNameChange');
    
    expect(wrapper.instance().state.nickname).toEqual('nickname');
    wrapper.find("#inp-nickname").simulate("change", { target: { value: "nicknameChange", name: 'nickname'} });
    expect(wrapper.instance().state.nickname).toEqual("nicknameChange");

    expect(wrapper.instance().state.website).toEqual('website');
    wrapper.find('#inp-Website').simulate('change', {target: {value: 'websiteChange', name: 'website'} });
    expect(wrapper.instance().state.website).toEqual('websiteChange');
    
    expect(wrapper.instance().state.bio).toEqual('bio');
    wrapper.find("#inp-bio").simulate("change", { target: { value: "bioChange", name: 'bio'} });
    expect(wrapper.instance().state.bio).toEqual("bioChange");

    //onBlur error
    expect(wrapper.instance().state.formErrors.fullName).toEqual('');
    wrapper.find('#inp-name').simulate('blur', {target: {value: '1234567891012345678910123456789101234567891012345678910', name: 'fullName'} });
    expect(wrapper.instance().state.formErrors.fullName).toEqual('FullName must be at most 50 symbol');
    
    expect(wrapper.instance().state.formErrors.nickname).toEqual('');
    wrapper.find("#inp-nickname").simulate('blur', {target: {value: 'incorrectlyNickname?', name: 'nickname'} });
    expect(wrapper.instance().state.formErrors.nickname).toEqual('Nickname must be less than 30 charachters and not empty and must contain only letters, numbers and/or underline charachter');
    
    expect(wrapper.instance().state.formErrors.website).toEqual('');
    wrapper.find("#inp-Website").simulate('blur', {target: {value: '12345678910123456789101234567891012345678910123456789101234567891012345678910', name: 'website'} });
    expect(wrapper.instance().state.formErrors.website).toEqual('Website must be at most 70 symbol');

    expect(wrapper.instance().state.formErrors.bio).toEqual('');
    wrapper.find("#inp-bio").simulate('blur', {target: {value: '12345678911234567891123456789112345678911234567891123456789112345678911234567891123456789112345678911234567891', name: 'bio'} });
    expect(wrapper.instance().state.formErrors.bio).toEqual('Bio must be at most 100 symbol');

    //modal-window
    wrapper.find("#modal-window").simulate('click', {target: {} });
    expect(wrapper.instance().state.open).toEqual(true);

    wrapper.find("#cancel").simulate('click', {target: {} });
    expect(wrapper.instance().state.cancel).toEqual(true);

  });

});
