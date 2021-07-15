import React from 'react'
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { PassportBtn } from './PassportBtn';

enzyme.configure({ adapter: new Adapter() });

describe('PassportBtn component', () => {
  const onBtnClickMock = jest.fn();
  const wrapper = shallow(
    <PassportBtn
      onClick={onBtnClickMock}
      name='google'
    />
  );

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({
      id: 'passport-btn',
      className: 'google-btn',
      variant: 'contained',
      color: 'primary',
      type: 'button',
      fullWidth: true
    })).toHaveLength(1);
    expect(wrapper.find('.google-icon')).toHaveLength(1);
  });

  describe('when user clicks btn', () => {
    it ('calls correct function', () => {
      wrapper.find('.google-btn').simulate('click');
      expect(onBtnClickMock).toHaveBeenCalledTimes(1);
    });
  });
});
