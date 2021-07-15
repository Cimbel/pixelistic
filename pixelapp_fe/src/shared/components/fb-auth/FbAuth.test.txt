import React from 'react'
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { FbAuth } from './FbAuth';
import { facebookId } from '../../../const/social-auth-config';

enzyme.configure({ adapter: new Adapter() });

describe('FbAuth component', () => {
  const handleFbMock = jest.fn(res => res);
  const wrapper = shallow(
    <FbAuth 
      handleFb={handleFbMock}
    />
  );

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({ appId: facebookId })).toHaveLength(1);
  });

  describe('when the component gets a respose from Facebook', () => {
    const res = {
      id: 123,
      name: 'Andrew',
      age: 24
    };

    it ('handles the correct function', () => {
      expect(wrapper.instance().responseFacebook(res)).toEqual(res);
    });
  });
});
