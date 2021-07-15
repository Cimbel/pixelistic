import React from "react";
import enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PostFooter } from "./PostFooter";

enzyme.configure({ adapter: new Adapter() });

describe("<PostFooter />", () => {
  let props = {
      userId: "1",
      postId: "1",
      liked: false,
      likesAmount: 10,
      authorName: "Vitalii Dvorian",
      authorComment: "Hello",
      comments: ["1","2","3","4","5","6","7","8","9","10"],
      date: 100
  };

  it("PostFooter rendering", () => {
    let component = shallow(<PostFooter {...props} />);
    expect(component.find(".post-footer")).toHaveLength(1);
    expect(component.find(".likes-panel")).toHaveLength(1);    
    expect(component.find(".author-name")).toHaveLength(4);
    expect(component.find(".author-comment")).toHaveLength(4);
    expect(component.find(".likes-amount")).toHaveLength(1);
    expect(component.find(".load-comments")).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it("PostFooter show more comments", () => {
    let component = shallow(<PostFooter {...props} />);
    expect(component.instance().state.commentsAmount).toEqual(3);
    component.find(".load-comments").simulate("click");
    expect(component.instance().state.commentsAmount).toEqual(10);
  });

  it("PostFooter testing props", () => {
    let component = shallow (<PostFooter {...props}/>);
    expect(component.instance().state.likesAmount).toEqual(10);
    expect(component.instance().state.liked).toEqual(false);
    expect(component.instance().state.authorName).toEqual("Vitalii Dvorian");
    expect(component.instance().state.authorComment).toEqual("Hello");
    expect(component.instance().state.date).toEqual(100);
  })
});

