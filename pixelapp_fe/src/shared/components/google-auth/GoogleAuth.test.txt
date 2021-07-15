import React from 'react'
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { GoogleAuth } from './GoogleAuth';
import { googleId } from '../../../const/social-auth-config';

enzyme.configure({ adapter: new Adapter() });

describe('GoogleAuth component', () => {
  const handleGoogleMock = jest.fn(res => res);
  const wrapper = shallow(
    <GoogleAuth 
      handleGoogle={handleGoogleMock}
    />
  );

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({ clientId: googleId })).toHaveLength(1);
  });

  describe('when the component gets a respose from Google', () => {
    const res = {
      profileObj: {
        name: 'Andrew',
        age: 24
      }
    };

    it ('handles the correct function', () => {
      expect(wrapper.instance().responseGoogle(res)).toEqual({
        name: 'Andrew',
        age: 24
      });
    });
  });
});
