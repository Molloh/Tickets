import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getMyCoupon, buyCoupon } from '../services/coupon';

export default {
  namespace: 'coupon',

  state: {
    coupons: [
      {
        id: 0,
        couponCost: 100,
        discount: 0.9,
        discription: '九折券',
      },
      {
        id: 1,
        couponCost: 200,
        discount: 0.8,
        discription: '八折券',
      },
    ],
    mycoupons: [],
  },

  effects: {
    *queryMyCoupons(_, { call, put }) {
      const response = yield call(getMyCoupon, sessionStorage.getItem("username"));
      yield put({
          type: 'saveMyCoupon',
          payload: response,
      })
    },
    *buyAnCoupon({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(buyCoupon, payload);
      if(response.success) {
        message.success(response.message);
        yield put(routerRedux.push('/coupon'));
      }
      else
        message.error(response.message);
    },
  },

  reducers: {
    saveMyCoupon(state, action) {
        return {
          ...state,
          mycoupons: action.payload,
        }
      },
  },
};
