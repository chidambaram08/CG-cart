import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: {}, // Corrected to orderDetails
    userOrders: [],
    loading: false,
    error: null, // Added error state here for consistency
  },
  reducers: {
    createOrderRequest(state) {
        return {
            ...state,
            loading: true
        };
    },
    createOrderSuccess(state, action) {
        return {
            ...state,
            loading: false,
            orderDetails: action.payload.order // Corrected to orderDetails
        };
    },
    createOrderFail(state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    },
    clearError(state) {
        return {
            ...state,
            error: null
        };
    },
    userOrdersRequest(state) {
        return {
            ...state,
            loading: true
        };
    },
    userOrdersSuccess(state, action) {
        return {
            ...state,
            loading: false,
            userOrders: action.payload.orders
        };
    },
    userOrdersFail(state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearError,
  userOrdersRequest,
  userOrdersSuccess,
  userOrdersFail
} = actions;

export default reducer;
