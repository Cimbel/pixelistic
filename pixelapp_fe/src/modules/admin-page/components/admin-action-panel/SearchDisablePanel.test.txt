import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchDisablePanel from './SearchDisablePanel';

enzyme.configure({ adapter: new Adapter() });

describe('SearchDisablePanel component', () => {
  const props = {
    query: 'an', 
    changeQueryState: jest.fn(), 
    selected: [ '0', '1', '3' ], 
    disableUser: jest.fn(),
    clearSelected: jest.fn()
  };
  const wrapper = shallow(<SearchDisablePanel {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.action-panel')).toHaveLength(1);
    expect(wrapper.find('.action-panel_delete')).toHaveLength(1);
  });
});
