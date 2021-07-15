import mockStore from '../../__mocks__/redux-mock-store';
import mockAxios from '../../__mocks__/axios';
import { host, port } from '../../const/node-server-config';
import * as actions from './index';
const store = mockStore();

describe('admin page async actions', () => {
  beforeEach(() => {
    store.clearActions();
    mockAxios.mockClear();
  });

  it('dispatches the LOAD_USERS_SUCCESS action', async () => {
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: {
        payload: 'get all users',
      }
    }));

    const expectedActions = [
      {
        type: 'LOAD_USERS_SUCCESS',
        payload: 'get all users'
      }
    ];

    await store.dispatch(actions.getUsers());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
      `${host}:${port}/dashboard`,
      {"data": undefined, "headers": "jest test", "method": "GET"}
    );
  });

  it('dispatches the USER_STATUS_UPDATED action', async () => {
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: {
        payload: {
          id: '1',
          status: false
        }
      }
    }));

    const expectedActions = [
      {
        type: 'USER_STATUS_UPDATED',
        payload: {
          id: '1',
          status: false
        }
      }
    ];

    await store.dispatch(actions.updateUserStatus('1', false));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
      `${host}:${port}/dashboard`,
      {"data": {"id": "1", "status": false}, "headers": "jest test", "method": "PATCH"}
    );
  });

  it('dispatches the DISABLE_USER_SUCCESS action', async () => {
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: {
        payload: 'get updated user list'
      }
    }));

    const expectedActions = [
      {
        type: 'DISABLE_USER_SUCCESS',
        payload: 'get updated user list'
      }
    ];

    await store.dispatch(actions.disableUser('1'));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
      `${host}:${port}/dashboard/disable`,
      {"data": {"IDs": "1"}, "headers": "jest test", "method": "PATCH"}
    );
  });

});
