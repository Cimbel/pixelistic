import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SignUp } from "./SignUp";

enzyme.configure({ adapter: new Adapter() });

beforeAll(() => {
  global.localStorage = {
    getItem() {}
  };
});

describe("<SignUp />", () => {
  it("SignUp rendering", () => {
    let component = shallow(<SignUp />);
    expect(component.find(".sign-up")).toHaveLength(1);
    expect(component.find(".intro-text")).toHaveLength(1);
    expect(component.find("#inp-nickname")).toHaveLength(1);
    expect(component.find("#inp-password")).toHaveLength(1);
    expect(component.find("#inp-confirm")).toHaveLength(1);
    expect(component.find(".submit-btn")).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it("SignUp update fields", () => {
    let component = shallow(<SignUp />);
    
    expect(component.instance().state.nickname).toEqual('');
    component.find('#inp-nickname').simulate('change', {target: {value: 'some-nickname', name: 'nickname'} });
    expect(component.instance().state.nickname).toEqual('some-nickname');
  
    expect(component.instance().state.passwordConf).toEqual('');
    component.find('#inp-confirm').simulate('change', {target: {value: 'some-conf', name: 'passwordConf'} });
    expect(component.instance().state.passwordConf).toEqual('some-conf');
    
    expect(component.instance().state.password).toEqual('');
    component.find("#inp-password").simulate("change", { target: { value: "some-pass" } });
    expect(component.instance().state.password).toEqual("some-pass");
  });

  it('SignUp show error', () => {
    let component = shallow(<SignUp />);

    expect(component.instance().state.formErrors.nickname).toEqual('');
    component.find('#inp-nickname').simulate('blur', {target: {value: 'nik', name: 'nickname'} });
    expect(component.instance().state.formErrors.nickname).toEqual('Nickname must contain only letters, numbers and/or underline charachter');
    
    expect(component.instance().state.formErrors.password).toEqual('');
    component.find("#inp-password").simulate('blur', {target: {value: 'pass', name: 'password'} });
    expect(component.instance().state.formErrors.password).toEqual('Password must be at least 6 characters long');
    
    expect(component.instance().state.formErrors.passwordConf).toEqual('');
    component.find("#inp-password").simulate('blur', {target: {value: 'Some-pass', name: 'passwordConf'} });
    component.find("#inp-confirm").simulate('blur', {target: {value: 'another-pass', name: 'passwordConf'} });
    expect(component.instance().state.formErrors.passwordConf).toEqual('Passwords don\'t match');
  });

  it("SignUp should redirect if Authorized", () => {
    let props = {
      isAuthorized: true 
    };
    let component = shallow(<SignUp {...props} />);
    expect(component.find(".sign-up")).not.toHaveLength(1);
  });
});
