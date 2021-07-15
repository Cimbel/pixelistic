import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DashboardFrame from './DashboardFrame';

enzyme.configure({ adapter: new Adapter() });

describe('DashboardFrame component', () => {
  const props = {
    users: [ { _id: '0', nickname: 'Ford',  }, { _id: '1', nickname: 'Robert' } ],
    handleDisableUser: jest.fn(),
    handleStatusChange: jest.fn()
  };

  const changeQuery = {
    target: {
      value: 'Robe'
    }
  }

  const wrapper = shallow(<DashboardFrame {...props} />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.dashboard_footer')).toHaveLength(1);
  });

  it ('should handle select of user', () => {
    wrapper.instance().handleClick(null, '0');
    expect(wrapper.instance().state.selected).toEqual(['0']);
  });

  it ('should handle select of all users', () => {
    wrapper.instance().handleSelectAllClick(null, false);
    expect(wrapper.instance().state.selected).toEqual([]);
  });

  it ('should handle clearing selected users', () => {
    wrapper.instance().handleClearSelected();
    expect(wrapper.instance().state.selected).toEqual([]);
  });

  it ('should handle search query', () => {
    wrapper.instance().handleChangeQueryState(changeQuery);
    expect(wrapper.instance().state.query).toEqual('Robe');
  });

});
