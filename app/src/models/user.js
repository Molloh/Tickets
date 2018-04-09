import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { query as queryUsers, queryProfile, submitProfile as submit, placeAnOrderSelectSeat, cancelAnOrder, querySchedules, searchSchedules, queryOrders, dealAnOrder, placeAnOrder } from '../services/user';
import { queryCurrent } from '../services/auth';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    profile: {},
    orders: [],
    schedules: [],
  },

  effects: {
    *jump(_, { put }) {
      yield put(routerRedux.push('/order-place'));
    },
    *jumpOrderInfo(_, { put }) {
      yield put(routerRedux.push('/orderInfo'));
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchOrders(_, { call, put }) {
      const response = yield call(queryOrders, sessionStorage.getItem('username'));
      yield put({
        type: 'saveOrders',
        payload: response,
      });
    },
    *fetchProfile(_, { call, put }) {
      const response = yield call(queryProfile, sessionStorage.getItem('username'));
      yield put({
        type: 'saveProfile',
        payload: response,
      });
    },
    *fetchSchedules(_, { call, put }) {
      const response = yield call(querySchedules);
      yield put({
        type: 'saveSchedules',
        payload: response,
      });
    },
    *searchSchedules({ payload }, { call, put }) {
      const response = yield call(searchSchedules, payload);
      yield put({
        type: 'saveSchedules',
        payload: response,
      });
    },

    *placeAnOrder({ payload }, { call, put }) {
      const response = yield call(placeAnOrder, payload);
      if(response.success) {
        yield put(routerRedux.push('/orderInfo'));
        sessionStorage.setItem("orderId", Number(response.message));
        message.success("订票成功!");
      }
      else
        message.error(response.message);
    },
    *placeAnOrderSelectSeat({ payload }, { call, put }) {
      const response = yield call(placeAnOrderSelectSeat, payload);
      if(response.success) {
        yield put(routerRedux.push('/orderInfo'));
        sessionStorage.setItem("orderId", Number(response.message));
        message.success(response.message);
      }
      else
        message.error(response.message);
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *submitProfile({ payload }, { call, put }) {
      const namedPayload = {...payload, username: sessionStorage.getItem('username')};
      const response = yield call(submit, namedPayload);
      yield put({
        type: 'saveProfile',
        payload: { ...payload },
      });
      if(response.success) 
        message.success(response.message);
      else
        message.error(response.message);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveProfile(state, action) {
      return {
        ...state,
        profile: { ...action.payload },
      }
    },
    saveOrders(state, action) {
      return {
        ...state,
        orders: action.payload,
      }
    },
    saveSchedules(state, action) {
      return {
        ...state,
        schedules: action.payload,
      }
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
