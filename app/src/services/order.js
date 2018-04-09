import request from '../utils/request';

export async function queryOrder(param) {
  return request(`/api/order/${param}`);
}

export async function dealAnOrder(param) {
  const { orderId, account, password } = param;
  const payload = { account, password };
  return request(`/api/order/deal/${orderId}`, {
    method: 'POST',
    body: payload,
  })
}

export async function cancelAnOrder(param) {
  console.log(`/api/order/cancel/${param}`);
  return request(`/api/order/cancel/${param}`, {
    method: 'POST',
  });
}

export async function confirmAnOrder(param) {
  console.log(`/api/order/${param}`);
  return request(`/api/order/${param}`, {
    method: 'POST',
  });
}