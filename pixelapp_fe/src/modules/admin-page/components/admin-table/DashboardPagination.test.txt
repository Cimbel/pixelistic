import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  DashboardPagination from './DashboardPagination';

enzyme.configure({ adapter: new Adapter() });

describe('DashboardPagination component', () => {
  const props = {
    count: null , 
    page: null, 
    rowsPerPage: null,
    onChangePage: jest.fn() 
  };
  const wrapper = shallow(<DashboardPagination {...props}/>);

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.dashboard_pagination-arrows')).toHaveLength(1);
  });

});
