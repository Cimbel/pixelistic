import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SignIn } from "./SignIn";

enzyme.configure({ adapter: new Adapter() });

describe("<SignIn />", () => {

  beforeAll(() => {
    global.localStorage = {
      getItem() {}
    };
  });

  it("SignIn rendering", () => {
    let component = shallow(<SignIn />);
    expect(component.find(".sign-in")).toHaveLength(1);
    expect(component.find(".signin-container")).toHaveLength(1);
    expect(component.find(".submit-btn")).toHaveLength(1);
    expect(component.find("#inp-password")).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('SignIn update fields', () => {
    let component = shallow(<SignIn />);
    expect(component.instance().state.password).toEqual('');
    component.find('#inp-password').simulate('change', {target: {value: 'some-pass', name: 'password'} });
    expect(component.instance().state.password).toEqual('some-pass');
});

  it('SignIn show error', () => {
    let component = shallow(<SignIn />);
    expect(component.instance().state.formErrors.password).toEqual('');
    component.find('#inp-password').simulate('change', {target: {value: 'pass', name: 'password'} });
    expect(component.instance().state.formErrors.password).toEqual('Password must be at least 6 characters long');
  });

  it("SignIn should redirect if Authorized", () => {
    let props = {
      isAuthorized: true 
    };
    let component = shallow(<SignIn {...props} />);
    expect(component.find(".sign-in")).not.toHaveLength(1);
  });
});
