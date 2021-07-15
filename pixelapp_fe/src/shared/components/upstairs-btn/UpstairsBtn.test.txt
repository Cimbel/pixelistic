import React from 'react'
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { UpstairsBtn } from './UpstairsBtn';

enzyme.configure({ adapter: new Adapter() });

describe('UpstairsBtn component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<UpstairsBtn />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({
      variant: 'outlined',
      className: 'upstairs-btn'
    })).toHaveLength(1);
  });
});
