import { message } from 'antd';
import { registerUser, registerStadium } from '../services/auth';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submitUser({ payload }, { call, put }) {
      const response = yield call(registerUser, payload);
      yield put({
        type: 'registerHandle',
        payload: { ...response, type: 'user' },
      });
      if(response.success) 
      message.success(response.message);
      else
      message.error(response.message);
    },
    *submitStadium({ payload }, { call, put }) {
      const response = yield call(registerStadium, payload);
      console.log(response);
      yield put({
        type: 'registerHandle',
        payload: { ...response, type: 'stadium' },
      });

      if(response.success) 
        message.success(response.message);
      else
        message.error(response.message);
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority(payload.type);
      reloadAuthorized();
      return {
        ...state,
        status: payload.success,
      };
    },
  },
};
