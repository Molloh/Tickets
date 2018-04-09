import { message } from 'antd';
import { queryStadium, activateStadium, querySchedule, checkSchedule, queryUser, abolishUser } from '../services/admin';

export default {
  namespace: 'admin',

  state: {
    status: undefined,
    stadiums: [],
    users: [],
    schedules: [],
  },

  effects: {
    *queryStadiums(_, { call, put }) {
      const response = yield call(queryStadium);
      yield put({
          type: 'saveStadiums',
          payload: response,
      })
    },
    *activateStadium({ payload }, { call }) {
      const response = yield call(activateStadium, payload);
      if(response.success) 
        message.success(response.message);
      else
        message.error(response.message);
    },

    *queryUsers(_, { call, put }) {
      const response = yield call(queryUser);
      yield put({
          type: 'saveUsers',
          payload: response,
      })
    },
    *abolishUser({ payload }, { call }) {
      const response = yield call(abolishUser, payload);
      if(response.success) 
        message.success(response.message);
      else
        message.error(response.message);
    },
    *querySchedules(_, { call, put }) {
      const response = yield call(querySchedule);
      yield put({
          type: 'saveSchedules',
          payload: response,
      })
    },
    *checkSchedule({ payload }, { call }) {
      const response = yield call(checkSchedule, payload);
      if(response.success) 
        message.success(response.message);
      else
        message.error(response.message);
    },
  },

  reducers: {
    saveStadiums(state, { payload }) {
      return {
        ...state,
        stadiums: payload,
      }
    },
    saveUsers(state, { payload }) {
      return {
        ...state,
        users: payload,
      }
    },
    saveSchedules(state, { payload }) {
      return {
        ...state,
        schedules: payload,
      }
    },
  },
};
