import { query, queryTickets } from '../services/deal';

export default {
  namespace: 'deal',

  state: {
    schedule: {},
    tickets: [],
    seats: [
      {row: 1, column: 1, isReserved: false},
      {row: 1, column: 2, isReserved: false},
      {row: 1, column: 3, isReserved: false},
      {row: 1, column: 4, isReserved: false},
      {row: 1, column: 5, isReserved: false},
      {row: 1, column: 6, isReserved: false},
      {row: 1, column: 7, isReserved: false},
      {row: 1, column: 8, isReserved: false},
      {row: 1, column: 9, isReserved: false},
      {row: 1, column: 10, isReserved: false},
      {row: 2, column: 1, isReserved: false},
      {row: 2, column: 2, isReserved: false},
      {row: 2, column: 3, isReserved: false},
      {row: 2, column: 4, isReserved: false},
      {row: 2, column: 5, isReserved: false},
      {row: 2, column: 6, isReserved: false},
      {row: 2, column: 7, isReserved: false},
      {row: 2, column: 8, isReserved: false},
      {row: 2, column: 9, isReserved: false},
      {row: 2, column: 10, isReserved: false},
      {row: 3, column: 1, isReserved: false},
      {row: 3, column: 2, isReserved: false},
      {row: 3, column: 3, isReserved: false},
      {row: 3, column: 4, isReserved: false},
      {row: 3, column: 5, isReserved: false},
      {row: 3, column: 6, isReserved: false},
      {row: 3, column: 7, isReserved: false},
      {row: 3, column: 8, isReserved: false},
      {row: 3, column: 9, isReserved: false},
      {row: 3, column: 10, isReserved: false},
      {row: 4, column: 1, isReserved: false},
      {row: 4, column: 2, isReserved: false},
      {row: 4, column: 3, isReserved: false},
      {row: 4, column: 4, isReserved: false},
      {row: 4, column: 5, isReserved: false},
      {row: 4, column: 6, isReserved: false},
      {row: 4, column: 7, isReserved: false},
      {row: 4, column: 8, isReserved: false},
      {row: 4, column: 9, isReserved: false},
      {row: 4, column: 10, isReserved: false},
      {row: 5, column: 1, isReserved: false},
      {row: 5, column: 2, isReserved: false},
      {row: 5, column: 3, isReserved: false},
      {row: 5, column: 4, isReserved: false},
      {row: 5, column: 5, isReserved: false},
      {row: 5, column: 6, isReserved: false},
      {row: 5, column: 7, isReserved: false},
      {row: 5, column: 8, isReserved: false},
      {row: 5, column: 9, isReserved: false},
      {row: 5, column: 10, isReserved: false},
      {row: 6, column: 1, isReserved: false},
      {row: 6, column: 2, isReserved: false},
      {row: 6, column: 3, isReserved: false},
      {row: 6, column: 4, isReserved: false},
      {row: 6, column: 5, isReserved: false},
      {row: 6, column: 6, isReserved: false},
      {row: 6, column: 7, isReserved: false},
      {row: 6, column: 8, isReserved: false},
      {row: 6, column: 9, isReserved: false},
      {row: 6, column: 10, isReserved: false},
      {row: 6, column: 1, isReserved: false},
      {row: 6, column: 2, isReserved: false},
      {row: 6, column: 3, isReserved: false},
      {row: 6, column: 4, isReserved: false},
      {row: 6, column: 5, isReserved: false},
      {row: 6, column: 6, isReserved: false},
      {row: 6, column: 7, isReserved: false},
      {row: 6, column: 8, isReserved: false},
      {row: 6, column: 9, isReserved: false},
      {row: 6, column: 10, isReserved: false},
      {row: 7, column: 1, isReserved: false},
      {row: 7, column: 2, isReserved: false},
      {row: 7, column: 3, isReserved: false},
      {row: 7, column: 4, isReserved: false},
      {row: 7, column: 5, isReserved: false},
      {row: 7, column: 6, isReserved: false},
      {row: 7, column: 7, isReserved: false},
      {row: 7, column: 8, isReserved: false},
      {row: 7, column: 9, isReserved: false},
      {row: 7, column: 10, isReserved: false},
      {row: 8, column: 1, isReserved: false},
      {row: 8, column: 2, isReserved: false},
      {row: 8, column: 3, isReserved: false},
      {row: 8, column: 4, isReserved: false},
      {row: 8, column: 5, isReserved: false},
      {row: 8, column: 6, isReserved: false},
      {row: 8, column: 7, isReserved: false},
      {row: 8, column: 8, isReserved: false},
      {row: 8, column: 9, isReserved: false},
      {row: 8, column: 10, isReserved: false},
      {row: 9, column: 1, isReserved: false},
      {row: 9, column: 2, isReserved: false},
      {row: 9, column: 3, isReserved: false},
      {row: 9, column: 4, isReserved: false},
      {row: 9, column: 5, isReserved: false},
      {row: 9, column: 6, isReserved: false},
      {row: 9, column: 7, isReserved: false},
      {row: 9, column: 8, isReserved: false},
      {row: 9, column: 9, isReserved: false},
      {row: 9, column: 10, isReserved: false},
      {row: 10, column: 1, isReserved: false},
      {row: 10, column: 2, isReserved: false},
      {row: 10, column: 3, isReserved: false},
      {row: 10, column: 4, isReserved: false},
      {row: 10, column: 5, isReserved: false},
      {row: 10, column: 6, isReserved: false},
      {row: 10, column: 7, isReserved: false},
      {row: 10, column: 8, isReserved: false},
      {row: 10, column: 9, isReserved: false},
      {row: 10, column: 10, isReserved: false},
    ],
  },

  effects: {
    *queryCurrentSchedule(_, { call, put }) {
      const response = yield call(query, sessionStorage.getItem("scheduleId"));
      yield put({
          type: 'saveSchedule',
          payload: response,
      })
    },
    *changeSeats({ payload }, { put }) {
      const response = [...payload];
      yield put({
        type: 'saveSeats',
        payload: response,
    })
    },
    *queryTickets(_, { call, put }) {
      const response = yield call(queryTickets, sessionStorage.getItem("scheduleId"));
      yield put({
        type: 'saveTickets',
        payload: response,
      })
    },
  },

  reducers: {
    saveSchedule(state, action) {
      return {
        ...state,
        schedule: action.payload,
      }
    },
    saveTickets(state, action) {
      return {
        ...state,
        tickets: action.payload,
      }
    },
    saveSeats(state, action) {
      return {
        ...state,
        seats: action.payload,
      }
    },
  },
};
