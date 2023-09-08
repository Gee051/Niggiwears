import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  userInfo: null,
};

const niggiSlice = createSlice({
  name: "niggi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );

      if (item) {
        item.quamtity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
 deleteItem: (state, action) => {
  state.productData = state.productData.filter(
    (item) => item.id !== action.payload.id
  );
},
  resetCart: (state) => {
    state.productData=[]
  },
  incrementQty: (state, action) => {
    const item = state.productData.find(
      (item) => item.id === action.payload.id
    );
    if (item) {
        item.quantity++;
      }
},
decrementQty: (state, action) => {
    const item = state.productData.find(
      (item) => item.id === action.payload.id
    );
    if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    }
}
});

export const {
     addToCart,
     deleteItem,
     resetCart,
     incrementQty,
     decrementQty
    } = niggiSlice.actions;
export default niggiSlice.reducer;
