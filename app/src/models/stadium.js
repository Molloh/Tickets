import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { queryProfile, offline, submitProfile, searchAnOrder, fetchSchedules, fetchOrders, submitOrders, submitSchedules } from '../services/stadium';

export default {
  namespace: 'stadium',

  state: {
    currentUser: {},
    profile: {},
    schedules: [],
    orders: [],
  },

  effects: {
    *jump(_, { put }) {
      yield put(routerRedux.push('/deal-offline'));
    },
    *jumpOrderConfirm(_, { put }) {
      yield put(routerRedux.push('/confirm-order'));
    },
    *offlineDealAnOrder({ payload }, { call, put }) {
      const response = yield call(offline, payload);
      if(response.success) {
        yield put(routerRedux.push('/schedule-info'));
        sessionStorage.setItem("orderId", Number(response.message));
        message.success("线下支付成功!");
      }
      else
        message.error(response.message);
    },
    *searchAnOrder({ payload }, { call, put }) {
      const response = yield call(searchAnOrder, payload);
      const data = [];
      data.push(response);
      yield put({
          type: 'saveOrders',
          payload: data,
      })
    },
    *fetchSchedules(_, { call, put }) {
      const response = yield call(fetchSchedules, sessionStorage.getItem('username'));
      yield put({
          type: 'saveSchedules',
          payload: response,
      })
    },
    *fetchOrders(_, { call, put }) {
        const response = yield call(fetchOrders, sessionStorage.getItem('username'));
        yield put({
            type: 'saveOrders',
            payload: response,
        })
      },
    *fetchProfile(_, { call, put }) {
      const response = yield call(queryProfile, sessionStorage.getItem('username'));
      yield put({
        type: 'saveProfile',
        payload: response,
      });
    },
    *submitProfile({ payload }, { call, put }) {
      const namedPayload = {...payload, stadiumCode: sessionStorage.getItem('username')};
      const response = yield call(submitProfile, namedPayload);
      yield put({
        type: 'saveProfile',
        payload: { ...payload },
      });
      if(response.success) 
        message.success(response.message);
      else
        message.error(response.message);
    },
    *submitOrders({ payload }, { call }) {
        const namedPayload = {...payload, stadiumCode: sessionStorage.getItem('username')};
        const response = yield call(submitOrders, namedPayload);
        if(response.success) 
          message.success(response.message);
        else
          message.error(response.message);
    },
    *submitSchedules({ payload }, { call }) {
      const namedPayload = {...payload, stadiumCode: sessionStorage.getItem('username')};
      const response = yield call(submitSchedules, namedPayload);
      if(response.success) 
        message.success(response.message);
      else
        message.error(response.message);
    },     
  },

  reducers: {
    saveOrders(state, action) {
      return {
        ...state,
        orders: [ ...action.payload ],
      }
    },
    saveSchedules(state, action) {
      return {
        ...state,
        schedules: action.payload,
      }
    },
    saveProfile(state, action) {
      return {
        ...state,
        profile: { ...action.payload },
      }
    },
  },
};
