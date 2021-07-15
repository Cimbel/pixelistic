import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DashboardTableHead from './DashboardTableHead';

enzyme.configure({ adapter: new Adapter() });

describe('DashboardTableHead component', () => {
  const props = {
    selectedCount: 3,
    rowsCount: 5,
    handleSelectAll: jest.fn(), 
    order: 'asc',
    orderBy: 'nickname',
    onRequestSort: jest.fn(),
  };
  const wrapper = shallow(<DashboardTableHead {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.dashboard_tablehead')).toHaveLength(1);
    expect(wrapper.find('.dashboard_tablecell')).toHaveLength(6);
    expect(wrapper.find('.dashboard_status-head')).toHaveLength(1);
  });

});
