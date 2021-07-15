import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PhotoEditor from "./PhotoEditor";

enzyme.configure({ adapter: new Adapter() });

describe("<PhotoEditor />", () => {

  it("PhotoEditor rendering", () => {
    let component = shallow(<PhotoEditor />);
    component.find(".modal-btn").simulate("click");
    expect(component.find(".modal-photo-editor")).toHaveLength(1);
    expect(component.find(".modal-content")).toHaveLength(1);
    expect(component.find(".modal-header")).toHaveLength(1);
    expect(component.find(".modal-body")).toHaveLength(1);
    expect(component.find(".sliders")).toHaveLength(1);
    expect(component.find(".filter")).toHaveLength(10);
    expect(component.find(".filter-name")).toHaveLength(10);
    expect(component.find(".filterCanvas")).toHaveLength(1);
    expect(component.find(".drawCanvas")).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it("PhotoEditor change fields", () => {
    let component = shallow(<PhotoEditor />);
    component.find(".modal-btn").simulate("click");
    //grayscale
    expect(component.instance().state.grayscale).toEqual(0);
    component.find(".filter > input").at(0).simulate('change', { target: { value: 7 } })
    expect(component.instance().state.grayscale).toEqual(7);
    //blur
    expect(component.instance().state.blur).toEqual(0);
    component.find(".filter > input").at(1).simulate('change', { target: { value: 7 } })
    expect(component.instance().state.blur).toEqual(7);
    //brightness
    expect(component.instance().state.brightness).toEqual(100);
    component.find(".filter > input").at(2).simulate('change', { target: { value: 7 } })
    expect(component.instance().state.brightness).toEqual(7);
    //contrast
    expect(component.instance().state.contrast).toEqual(100);
    component.find(".filter > input").at(3).simulate('change', { target: { value: 7 } })
    expect(component.instance().state.contrast).toEqual(7);
    //hueRotate
    expect(component.instance().state.hueRotate).toEqual(0);
    component.find(".filter > input").at(4).simulate('change', { target: { value: 7 } })
    expect(component.instance().state.hueRotate).toEqual(7);
    //invert
    expect(component.instance().state.invert).toEqual(0);
    component.find(".filter > input").at(5).simulate('change', { target: { value: 7 } })
    expect(component.instance().state.invert).toEqual(7);
    //saturate
    expect(component.instance().state.saturate).toEqual(100);
    component.find(".filter > input").at(6).simulate('change', { target: { value: 7 } })
    expect(component.instance().state.saturate).toEqual(7);
    //sepia
    expect(component.instance().state.sepia).toEqual(0);
    component.find(".filter > input").at(7).simulate('change', { target: { value: 7 } })
    expect(component.instance().state.sepia).toEqual(7);
  });
  
  it("PhotoEditor toggle eraser", () => {
    let component = shallow(<PhotoEditor />);
    component.find(".modal-btn").simulate("click");
    
    expect(component.instance().state.drawTool).toEqual('draw');
    component.find(".eraser").simulate('click', { target: {} });
    expect(component.instance().state.drawTool).toEqual('erase');   
    component.find(".eraser").simulate('click', { target: {} })
    expect(component.instance().state.drawTool).toEqual('draw');
  });

  it("PhotoEditor reset btn", () => {
    let component = shallow(<PhotoEditor />);
    component.find(".modal-btn").simulate("click");

    expect(component.instance().state.grayscale).toEqual(0);
    component.find(".filter > input").at(0).simulate('change', { target: { value: 7 } })
    component.find(".photo-editor-btn").at(0).simulate("click");
    expect(component.instance().state.grayscale).toEqual(0);
  });

  it("PhotoEditor close btn", () => {
    let component = shallow(<PhotoEditor />);
    component.find(".modal-btn").simulate("click");

    expect(component.instance().state.open).toEqual(true);
    component.find(".close").simulate("click");
    expect(component.instance().state.open).toEqual(false);
  });
});
