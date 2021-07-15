import React from 'react'
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { Like } from './Like';

enzyme.configure({ adapter: new Adapter() });

describe('Like component', () => {
  const handleLikeMock = jest.fn((checked, parentId) => ({checked, parentId}));
  const wrapper = shallow(
    <Like 
      handleLike={handleLikeMock}
      parentId={123}
      liked={true}
    />
  );

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.like')).toHaveLength(1);
  });

  describe('when the component is being changed', () => {
    it ('handles the change', () => {
      expect(wrapper.instance().handleChange(null, true)).toEqual({
        checked: true,
        parentId: 123
      });
    });
  });
});
