import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocationAutocomplete  from './LoadingSpinner';

Enzyme.configure({ adapter: new Adapter() });

describe('render component', () => {
  const wrapper = shallow(<LocationAutocomplete size = {30}/>);

  it('should render static components', () => {
    expect(wrapper.find('.loading-spinner')).toHaveLength(1);
    expect(wrapper.find({
      className: 'spinner',
      size: 30
    })).toHaveLength(1);
  })
})
