import request from '../utils/request';

export async function buyCoupon(params) {
  console.log(`/api/coupon/${sessionStorage.getItem("username")}`);
  return request(`/api/coupon/${sessionStorage.getItem("username")}`, {
    method: 'POST',
    body: params,
  });
}

export async function getMyCoupon(params) {
  return request(`/api/coupon/${params}`);
}