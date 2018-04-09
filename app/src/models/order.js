import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { queryOrder, dealAnOrder, cancelAnOrder, confirmAnOrder } from '../services/order';

export default {
  namespace: 'order',

  state: {
    order: {},
  },

  effects: {
    *cancelAnOrder({ payload: { orderId } }, { call, put }) {
      const response = yield call(cancelAnOrder, orderId);
      if(response.success) {
        yield put(routerRedux.push('/myorder'));
        message.success(response.message);
      }
      else
        message.error(response.message);
    },
    *confirmAnOrder({ payload: { orderId } }, { call, put }) {
      const response = yield call(confirmAnOrder, orderId);
      if(response.success) {
        yield put(routerRedux.push('/order-manage'));
        message.success(response.message);
      }
      else
        message.error(response.message);
    },
    *queryOrder(_, { call, put }) {
      const response = yield call(queryOrder, sessionStorage.getItem("orderId"));
      yield put({
          type: 'saveOrder',
          payload: response,
      })
    },

    *dealAnOrder({ payload }, { call, put }) {
      const response = yield call(dealAnOrder, payload);
      // TODO
      if(response.success) {
        message.success(response.message);
        yield put(routerRedux.push('/orderInfo'));
      }
      else
        message.error(response.message);
    },
  },

  reducers: {
    saveOrder(state, { payload }) {
      return {
        ...state,
        order: payload,
      }
    },
  },
};
