import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function querySchedules() {
  return request('/api/schedule');
}

export async function searchSchedules(param) {
  return request(`/api/schedule/search/${param}`);
}

export async function queryProfile(param) {
  return request(`/api/users/${param}`);
}

export async function queryOrders(param) {
  return request(`/api/order/user/${param}`);
}

export async function placeAnOrder(param) {
  return request("/api/order", {
    method: 'POST',
    body: param,
  })
}

export async function placeAnOrderSelectSeat(param) {
  return request("/api/order/select", {
    method: 'POST',
    body: param,
  })
}

export async function submitProfile(param) {
  return request('/api/users', {
    method: 'POST',
    body: param,
  })
}
