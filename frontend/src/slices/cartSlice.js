import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    loading: false,
  },
  reducers: {
    addCartItemRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    addCartItemSuccess(state, action) {
      const item = action.payload;
      const isItemsExist = state.items.find((i) => i.product === item.product);
      if (isItemsExist) {
        state = {
          ...state,
          loading: false,
        };
      } else {
        state = {
          items: [...state.items, item],
          loading: false,
        };
        localStorage.setItem("cartItem", JSON.stringify(state.items));
      }
      return state;
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addCartItemRequest, addCartItemSuccess } = actions;

export default reducer;
