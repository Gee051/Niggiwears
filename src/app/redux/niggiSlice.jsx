import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";

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
        toast.info(`${action.payload.title} is already in your Cart`);
      } else {
        state.productData.push(action.payload);
        if (!item) {
          toast.success(`${action.payload.title} is added to Cart`);
        }
      }
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetCart: (state) => {
      state.productData = [];
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
    },
  },
});

<ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

export const {
  addToCart,
  deleteItem,
  resetCart,
  incrementQty,
  decrementQty,
} = niggiSlice.actions;
export default niggiSlice.reducer;
