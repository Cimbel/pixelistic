import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomTime  from './CustomTime';

Enzyme.configure({ adapter: new Adapter() });

describe('render component', () => {
  const wrapper = shallow(<CustomTime timestamp = {12323123123123}/>);
  it('should render static components', () => {
    expect(wrapper.find('.date')).toHaveLength(1);
  })
})
