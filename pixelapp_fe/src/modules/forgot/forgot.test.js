import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ForgotPassword} from './Forgot';

enzyme.configure({ adapter: new Adapter() });

describe('Forgot component', () => {
    beforeAll(() => {
        global.localStorage = {
          getItem() {}
        };
      });    

    it('renders correctly', () => {
        let element = shallow(<ForgotPassword/>);
        expect(element.find('.forgot')).toHaveLength(1);
        expect(element.find('.forgot-container')).toHaveLength(1);
        expect(element.find('.forgot-form')).toHaveLength(1);
        expect(element.find('.forgot-reset-btn')).toHaveLength(1);
    });

    it('isButtonDisabled', () => {
        let element = shallow(<ForgotPassword/>);
        expect(element.find({
            className: "forgot-reset-btn",
            disabled: true
        })).toHaveLength(1);
    });

    it('isButtonEnable', () => {
        let element = shallow(<ForgotPassword/>);
        element.setState({emailValid: true})
        expect(element.find({
            className: "forgot-reset-btn",
            disabled: false
        })).toHaveLength(1);
    });

   
});
