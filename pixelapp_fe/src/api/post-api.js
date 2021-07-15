import httpServise from './http-service';
import { host , port } from '../const/node-server-config';

export const postApi = {
  addPost: (image, description, geolocation, author) => {
    const post = {image, description, geolocation, author}
    return new Promise((resolve, reject) => {
      httpServise.post(`${host}:${port}/add-post`, { post }).then(
        res => {
          if (res.data.post) {
            resolve(res.data.post);
          } else reject({ status: 401 });
        }, err => reject(err)
      );
    });
  },

  likePost: (postId, userId, type) => {
    return new Promise((resolve, reject) => {
      httpServise.patch(`${host}:${port}/${type}-post`, { postId, userId }).then(
        res => {
          if (res.data.newLikes) {
            resolve(res.data.newLikes);
          } else reject({ status: 401 });
        }, err => reject(err)
      );
    });
  },

  commentPost: (postId, userNickname, userAvatar, comment) => {
    return new Promise((resolve, reject) => {
      httpServise.patch(`${host}:${port}/comment-post`, { postId, userNickname, userAvatar, comment }).then(
        res => {
          if (res.data.newComments) {
            resolve(res.data.newComments);
          } else reject({ status: 401 });
        }, err => reject(err)
      );
    });
  },

  removePost: (postId, userId, imagePath) => {
    return new Promise((resolve, reject) => {
      httpServise.delete(`${host}:${port}/remove-post`, { postId, userId, imagePath }).then(
        res => {
          if (res.data.postId) {
            resolve(res.data.postId);
          } else reject({ status: 401 });
        }, err => reject(err)
      );
    });
  }
}
