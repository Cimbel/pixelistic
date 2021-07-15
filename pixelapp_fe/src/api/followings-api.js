import httpServise from './http-service';
import { host, port } from '../const/node-server-config';

export const followApi = {
  follow: (data) => {
    return new Promise ((resolve, reject) => {
      httpServise.patch(`${host}:${port}/followings/follow`, data).then(
        res => {
          if (res.data.payload) {
            resolve(res.data.payload);
          } else reject({status: 401});
        }, err => reject(err)
      );
    });
  },

  unfollow: (data) => {
    return new Promise ((resolve, reject) => {
      httpServise.patch(`${host}:${port}/followings/unfollow`, data).then(
        res => {
          if (res.data.payload) {
            resolve(res.data.payload);
          } else reject({status: 401});
        }, err => reject(err)
      );
    });
  },

  handleFavorite: (data) => {
    return new Promise ((resolve, reject) => {
      httpServise.patch(`${host}:${port}/followings/handle-favorite`, data).then(
        res => {
          if (res.data.payload) {
            resolve(res.data.payload);
          } else reject({ status: 401});
        }, err => reject(err)
      );
    });
  },
};
