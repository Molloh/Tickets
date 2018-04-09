import request from '../utils/request';

export async function query(param) {
  return request(`/api/schedule/info/${param}`);
}

export async function queryTickets(param) {
  return request(`/api/schedule/tickets/${param}`);
}