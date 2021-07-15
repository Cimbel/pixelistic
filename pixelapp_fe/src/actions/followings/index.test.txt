import mockStore from '../../__mocks__/redux-mock-store';
import mockAxios from '../../__mocks__/axios';
import { host, port } from '../../const/node-server-config';
import * as actions from './index';
const store = mockStore();

describe('followings async actions', () => {
  beforeEach(() => {
    store.clearActions();
    mockAxios.mockClear();
  });

  it('dispatches the FOLLOW_SUCCESS action', async () => {
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: {
        payload: '100500',
      }
    }));

    const expectedActions = [
      {
        type: 'FOLLOW_SUCCESS',
        payload: '100500'
      }
    ];

    await store.dispatch(actions.follow());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
      `${host}:${port}/followings/follow`,
      {"data": undefined, "headers": "jest test", "method": "PATCH"}
    );
  });

  it('dispatches the HANDLE_FAVORITE_SUCCESS action', async () => {
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: {
        payload: {
          followingInfoId: '100500',
          checked: true
        }
      }
    }));

    const expectedActions = [
      {
        type: 'HANDLE_FAVORITE_SUCCESS',
        payload: {
          followingInfoId: '100500',
          checked: true
        }
      }
    ];

    await store.dispatch(actions.handleFavorite());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
      `${host}:${port}/followings/handle-favorite`,
      {"data": undefined, "headers": "jest test", "method": "PATCH"}
    );
  });

  it('dispatches the UNFOLLOW_SUCCESS action', async () => {
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: {
        payload: '100500',
      }
    }));

    const expectedActions = [
      {
        type: 'UNFOLLOW_SUCCESS',
        payload: '100500'
      }
    ];

    await store.dispatch(actions.unfollow());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
      `${host}:${port}/followings/unfollow`,
      {"data": undefined, "headers": "jest test", "method": "PATCH"}
    );
  });
});

describe('followings sync actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches the LOAD_CURRENT_FOLLOWINGS action', () => {
    const expectedActions = [
      {
        'type': 'LOAD_CURRENT_FOLLOWINGS',
        payload: {
          nickname: 'JohnDoe',
          age: 30
        }
      }
    ];

    store.dispatch(actions.loadCurrentFollowings({
      nickname: 'JohnDoe',
      age: 30
    }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches the CLEAN_USERS_ARRAY action', () => {
    const expectedActions = [
      { 
        type: 'CLEAN_USERS_ARRAY' 
      }
    ]

    store.dispatch(actions.cleanUsersArray());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches the STATUS_CONNECTION_CHANGE action', () => {
    const expectedActions = [
      {
        'type': 'STATUS_CONNECTION_CHANGE',
        payload: {
          id: '111',
          status: 'online'
        }
      }
    ];

    store.dispatch(actions.changeFollowingsStatus({
      id: '111',
      status: 'online'
    }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
