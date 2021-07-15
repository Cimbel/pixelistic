import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ModalChangePassword } from './ModalChangePassword';

enzyme.configure({ adapter: new Adapter() });

describe('ModalChangePassword component', () => {

  it('renders correctly', () => {
    let wrapper = shallow(<ModalChangePassword/>);

    expect(wrapper.find('.modal-change-password')).toHaveLength(1);
    expect(wrapper.find(".form-modal")).toHaveLength(1);
    expect(wrapper.find("#inp-old-password")).toHaveLength(1);
    expect(wrapper.find("#inp-new-password")).toHaveLength(1);
    expect(wrapper.find("#inp-new-confirm")).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();


    //onChange succcess
    expect(wrapper.instance().state.oldPassword).toEqual('');
    wrapper.find('#inp-old-password').simulate('change', {target: {value: 'oldPassword', name: 'oldPassword'} });
    expect(wrapper.instance().state.oldPassword).toEqual('oldPassword');

    expect(wrapper.instance().state.newPassword).toEqual('');
    wrapper.find('#inp-new-password').simulate('change', {target: {value: 'newPassword', name: 'newPassword'} });
    expect(wrapper.instance().state.newPassword).toEqual('newPassword');
    
    expect(wrapper.instance().state.newPasswordConf).toEqual('');
    wrapper.find("#inp-new-confirm").simulate("change", { target: { value: "newPasswordConf", name: 'newPasswordConf' } });
    expect(wrapper.instance().state.newPasswordConf).toEqual("newPasswordConf");
    
  });

  it('renders correctly', () => {
    let wrapper = shallow(<ModalChangePassword/>);

    expect(wrapper.instance().state.formErrors.oldPassword).toEqual('');
    wrapper.find("#inp-old-password").simulate('blur', {target: {value: '123', name: 'oldPassword'} });
    expect(wrapper.instance().state.formErrors.oldPassword).toEqual('Password must be at least 6 characters long');


    expect(wrapper.instance().state.formErrors.newPassword).toEqual('');
    wrapper.find("#inp-new-password").simulate('change', {target: {value: '321', name: 'newPassword'} });
    wrapper.find("#inp-new-password").simulate('blur', {target: {value: '321', name: 'newPassword'} });
    expect(wrapper.instance().state.formErrors.newPassword).toEqual('Password must be at least 6 characters long');
    
    expect(wrapper.instance().state.formErrors.newPasswordConf).toEqual('');
    wrapper.find("#inp-new-password").simulate('change', {target: {value: '321321', name: 'newPassword'} });
    wrapper.find("#inp-new-password").simulate('blur', {target: {value: '321321', name: 'newPassword'} });
    wrapper.find("#inp-new-confirm").simulate('change', {target: {value: '312321', name: 'newPasswordConf'} });
    expect(wrapper.instance().state.formErrors.newPasswordConf).toEqual('Passwords don\'t match');
  });
});
