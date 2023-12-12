import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  favData: [],
  userInfo: null,
};

const niggiFavSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
   addToFav: (state, action) => {
      const item = state.favData.find(
        (item) => item.id === action.payload.id
      );

      if (item) {
        toast.info(`${action.payload.title} is already in your favorites`);
      } else {
        state.favData.push(action.payload);
        if (!item) {
          toast.success(`${action.payload.title} is added to Favorites`);
        }
      }
    },
    deleteFav: (state, action) => {
      state.favData = state.favData.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetFav: (state) => {
      state.favData = [];
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
  addToFav,
  deleteFav,
  resetFav,
} = niggiFavSlice.actions;
export default niggiFavSlice.reducer;
