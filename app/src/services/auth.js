import request from '../utils/request';

export async function userSignIn(params) {
    return request('/api/auth/user/signin', {
      method: 'POST',
      body: params,
    });
}

export async function stadiumSignIn(params) {
  return request('/api/auth/stadium/signin', {
    method: 'POST',
    body: params,
  });
}

export async function adminSignIn(params) {
  console.log(params);
  return request('/api/auth/admin/signin', {
    method: 'POST',
    body: params,
  });
}

export async function registerUser(params) {
  return request('/api/auth/user/signup', {
    method: 'POST',
    body: params,
  })
}

export async function registerStadium(params) {
  return request('/api/auth/stadium/signup', {
    method: 'POST',
    body: params,
  })
}

export async function queryCurrent() {
  return { username: sessionStorage.getItem("username"), avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'};
}