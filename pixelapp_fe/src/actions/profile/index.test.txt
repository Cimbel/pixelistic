import mockStore from '../../__mocks__/redux-mock-store';
import mockAxios from '../../__mocks__/axios';
import { host, port } from '../../const/node-server-config';
import * as actions from './index';
const store = mockStore();

describe('profile async actions', () => {
  beforeEach(() => {
    store.clearActions();
    mockAxios.mockClear();
  });

  it('dispatches the GET_PROFILE_SUCCESS action', async () => {
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: {
        payload: 'get profile',
      }
    }));

    const expectedActions = [
      {
        type: 'LOADING'
      },
      {
        type: 'GET_PROFILE_SUCCESS',
        payload: 'get profile'
      }
    ];

    await store.dispatch(actions.getProfile('carbonid1'));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
      `${host}:${port}/profile/get-profile/carbonid1`,
      {"data": undefined, "headers": "jest test", "method": "GET"}
    );
  });

  it('dispatches the PROFILE_UPDATED_SUCCESS action', async () => {
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: {
        payload: {
          _id: '1',
          bio: 'update_bio',
          website: 'update_website',
          fullName: 'update_fullName',
          avatar: 'update_avatar',
          nickname: 'update_nickname'
        }
      }
    }));

    const expectedActions = [
      {
        type: 'PROFILE_UPDATED_SUCCESS',
        payload: {
          _id: '1',
          bio: 'update_bio',
          website: 'update_website',
          fullName: 'update_fullName',
          avatar: 'update_avatar',
          nickname: 'update_nickname'
        }
      }
    ];

    await store.dispatch(actions.updateProfile('1', 'update_fullName', 'update_nickname', 'update_website', 'update_bio', 'update_avatar', ()=>{}, ()=>{}));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
      `${host}:${port}/profile/1`,
      {"data": {
        bio: 'update_bio',
        website: 'update_website',
        fullName: 'update_fullName',
        avatar: 'update_avatar',
        nickname: 'update_nickname'
      }, "headers": "jest test", "method": "POST"}
    );
  });

  it('dispatches the CHANGE_PASSWORD action', async () => {
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: {
        payload: 'password saved'
      }
    }));

    const expectedActions = [
      {
        type: 'CHANGE_PASSWORD',
        payload: 'password saved'
      }
    ];

    await store.dispatch(actions.userChangePassword('1', 'oldPassword', 'newPassword', 'newPassword'));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
      `${host}:${port}/profile/change-password/1`,
      {"data": { 
        oldPassword: 'oldPassword', 
        newPassword: 'newPassword', 
        newPasswordConf: 'newPassword' 
      }, "headers": "jest test", "method": "POST"}
    );
  });
});
