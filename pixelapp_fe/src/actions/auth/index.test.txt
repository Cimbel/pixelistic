import mockStore from '../../__mocks__/redux-mock-store';
import mockAxios from '../../__mocks__/axios';
import { host, port } from '../../const/node-server-config';
import * as actions from './index';
const store = mockStore();

describe('forgot password async actions', () => {
    beforeEach(() => {
      store.clearActions();
      mockAxios.mockClear();
    });

    it('dispatches is email in db', async () => {
        mockAxios.mockImplementationOnce(() => Promise.resolve({
          data: {
            text: 'response',
          }
        }));
    
        const expectedActions = [
          {
            type: 'FORGOT_EMAIL_EXIST',
            payload: 'response'
          }
        ];
    
        await store.dispatch(actions.authForgotEmail('email@server.com'));
        expect(store.getActions()).toEqual(expectedActions);
        expect(mockAxios).toHaveBeenCalledTimes(1);
        expect(mockAxios).toHaveBeenCalledWith(
          `${host}:${port}/forgot`,
            {
              data: {
                email:'email@server.com'
              },
              headers: 'jest test',
              method: 'POST'
            }
          );
    });
});
