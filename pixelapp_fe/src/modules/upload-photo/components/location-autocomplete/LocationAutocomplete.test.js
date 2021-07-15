import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocationAutocomplete  from './LocationAutocomplete';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  onSelectLocation: jest.fn()
}

const wrapper = shallow(<LocationAutocomplete {...props}/>);

describe('render component', () => {

  it('should render static components', () => {
    expect(wrapper.find('.input')).toHaveLength(1);
    expect(wrapper.find('.location-autocomplete')).toHaveLength(1);
    expect(wrapper.find('.variants')).toHaveLength(1);
    expect(wrapper.find('.search-loc')).toHaveLength(0);
  })
})

describe('input search query', () => {
  it('shoud change search text', () => {
    const event = {
      target: { value: 'Lv' }
    };
    wrapper.find('.input').simulate('change', event);
    expect(wrapper.instance().state.searchText).toEqual('Lv');
  })
});

describe('autocomplete functionality', () => {
  wrapper.setState({
    features: [ 1, 2, 2 ]
  });

  const arrowDownEvent = {
    which: 40,
    preventDefault: jest.fn()
  };

  const arrowUpEvent = {
    which: 38,
    preventDefault: jest.fn()
  };
  
  const closeAutoCompleteEvent = {
    which: 27,
    preventDefault: jest.fn()
  }

  const selectLocationEvent = {
    which: 13,
    preventDefault: jest.fn()
  }

  it('should navigate up', () => {
    wrapper.setState({
      suggestionOpen: true,
      currentIndex: 0
    })

    wrapper.find('.input').simulate('keydown', arrowDownEvent );
    expect(wrapper.instance().state.currentIndex).toEqual(1);
  });

  it('should not navigate', () => { 
    wrapper.setState({
      suggestionOpen: false,
      currentIndex: 1
    })
    wrapper.find('.input').simulate('keydown', arrowDownEvent );
    expect(wrapper.instance().state.currentIndex).toEqual(1);

    wrapper.find('.input').simulate('keydown', arrowUpEvent );
    expect(wrapper.instance().state.currentIndex).toEqual(1);
  });

  it('should navigate down', () => {
    wrapper.setState({
      suggestionOpen: true,
      currentIndex: 1
    })
    wrapper.find('.input').simulate('keydown', arrowUpEvent );
    expect(wrapper.instance().state.currentIndex).toEqual(0);
  })

  it('should not navigate out of range', () => {
    wrapper.setState({
      suggestionOpen: true,
      currentIndex: 0,
      features: [ 1 ]
    })

    wrapper.find('.input').simulate('keydown', arrowUpEvent );
    expect(wrapper.instance().state.currentIndex).toEqual(0);

    wrapper.find('.input').simulate('keydown', arrowDownEvent );
    expect(wrapper.instance().state.currentIndex).toEqual(0);

  })

  it('should close autocomplete', () => {
    wrapper.setState({
      suggestionOpen: true
    })

    wrapper.find('.input').simulate('keydown', closeAutoCompleteEvent );
    expect(wrapper.instance().state.suggestionOpen).toEqual(false);
  });

  it('should select location', () => {
    wrapper.setState({
      suggestionOpen: true,
      currentIndex: 1,
      features: [ {
        place_name_en: 'Lviv'
      },
      {
        place_name_en: 'Kiev'
      } ]
    })

    wrapper.find('.input').simulate('keydown', selectLocationEvent );
    expect(wrapper.instance().state.searchText).toEqual('Kiev');
    expect(wrapper.instance().state.suggestionOpen).toEqual(false);

  })

  it('should select location by mouse over', () => {
    const mouseSelectEvent = {
      target: {
        id: '0'
      }
    }

    wrapper.setState({
      suggestionOpen: true,
      currentIndex: -1,
    })

    wrapper.find('.search-loc').at(0).simulate('mouseenter', mouseSelectEvent );
    expect(wrapper.instance().state.currentIndex).toEqual(0);
  })
});
