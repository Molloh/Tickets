import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { userSignIn, stadiumSignIn, adminSignIn } from '../services/auth';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: false,
  },

  effects: {
    *userlogin({ payload }, { call, put }) {
      const response = yield call(userSignIn, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {response, type: payload.type},
      });
      // Login successfully
      if (response.success) {
        reloadAuthorized();
        sessionStorage.setItem('username', payload.usernameOrEmail);
        yield put(routerRedux.push('/myorder'));
      } else {
        message.warning("此账号已被注销!");
      }
    },
    *stadiumlogin({ payload }, { call, put }) {
      const response = yield call(stadiumSignIn, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {response, type: payload.type},
      });
      // Login successfully
      if (response.success) {
        reloadAuthorized();
        sessionStorage.setItem('username', payload.stadiumCode);
        yield put(routerRedux.push('/stadiumprofile'));
      }
    },
    *adminlogin({ payload }, { call, put }) {
      const response = yield call(adminSignIn, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {response, type: payload.type},
      });
      // Login successfully
      if (response.success) {
        reloadAuthorized();
        sessionStorage.setItem('username', payload.usernameOrEmail);
        yield put(routerRedux.push('/analysis'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.type);
      return {
        ...state,
        status: payload.success,
        type: payload.type,
      };
    },
  },
};
