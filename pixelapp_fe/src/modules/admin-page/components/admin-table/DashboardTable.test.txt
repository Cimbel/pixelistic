import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  DashboardTable from './DashboardTable';

enzyme.configure({ adapter: new Adapter() });

describe('DashboardTable component', () => {
  const props = {
    users: [ 
      { _id: '0', nickname: 'Ford' },
      { _id: '1', nickname: 'Robert' },
      { _id: '2', nickname: 'Wendy' }
    ],
    handleClick: jest.fn(), 
    handleStatusChange: jest.fn(), 
    selected: ['0'], 
    classes: {},
    handleSelectAllClick: jest.fn()
  };
  const wrapper = shallow(<DashboardTable {...props}/>);

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
