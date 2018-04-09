import request from '../utils/request';

export async function queryProfile(param) {
  return request(`/api/stadium/${param}`);
}

export async function submitProfile(param) {
  return request('/api/stadium', {
    method: 'POST',
    body: param,
  })
}

export async function searchAnOrder(param) {
  return request(`/api/order/${param}`);
}

export async function fetchSchedules(param) {
  return request(`/api/schedule/${param}`);
}

export async function submitSchedules(param) {
  console.log(param);
  return request('/api/schedule/publish', {
    method: 'POST',
    body: param,
  })
}

export async function offline(param) {
  return request('/api/order/offline-deal', {
    method: 'POST',
    body: param,
  })
}

export async function fetchOrders(param) {
  return request(`/api/order/stadium/${param}`);
}

export async function submitOrders(param) {
  return request(`/api/order/offline-deal/${param}`, {
    method: 'POST',
    body: param,
  })
}