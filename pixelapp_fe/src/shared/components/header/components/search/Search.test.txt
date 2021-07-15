import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Search } from "./Search";
import mockAxios from "../../../../../__mocks__/axios";

enzyme.configure({ adapter: new Adapter() });
describe("<Search />", () => {
    
  mockAxios.mockImplementation(() =>
    Promise.resolve({
      data: {
        users: [
          { avatar: "avatar1.png", nickname: "user1" },
          { avatar: "avatar2.png", nickname: "user2" }
        ]
      }
    })
  );

  it("Search rendering", () => {
    let component = shallow(<Search />);
    expect(component.find(".search")).toHaveLength(1);
    expect(component.find(".search-inp")).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it("Search get users", () => {
    let component = shallow(<Search />);
    expect(component.instance().state.users).toEqual(null);
    component.find(".search-inp").simulate("focus");

    setImmediate(() => {
      expect(component.instance().state.users).toEqual([
        { avatar: "avatar1.png", nickname: "user1" },
        { avatar: "avatar2.png", nickname: "user2" }
      ]);
    });
  });

  it("Search show users", () => {
    let component = shallow(<Search />);
    component.find(".search-inp").simulate("focus");
    setImmediate(() => {
      expect(component.instance().state.showUsers).toEqual([]);
      component.find('.search-inp').simulate('change', {target: {value: 'user'}});      
      expect(component.instance().state.showUsers).toEqual([ 
        { avatar: 'avatar1.png', nickname: 'user1' },
        { avatar: 'avatar2.png', nickname: 'user2' } 
      ]);
      component.find('.search-inp').simulate('change', {target: {value: 'qwerty'}});
      expect(component.instance().state.showUsers).toEqual([]);
    });
  });
});
