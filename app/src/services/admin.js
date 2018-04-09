import request from '../utils/request';

export async function activateStadium(params) {
  return request(`/api/admin/stadium/${params.stadiumCode}`, {
    method: 'POST',
  });
}

export async function abolishUser(params) {
  console.log(params);
  return request(`/api/admin/user/${params.username}`, {
    method: 'POST',
  });
}

export async function checkSchedule(params) {
  console.log(params);
  return request(`/api/admin/schedule/${params.scheduleId}`, {
    method: 'POST',
  });
}

export async function queryStadium() {
  return request('/api/admin/stadiums');
}

export async function queryUser() {
  return request('/api/admin/users');
}

export async function querySchedule() {
  return request('/api/admin/schedules');
}