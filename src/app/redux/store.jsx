import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import niggiReducer from "./niggiSlice";
import niggiFavReducer from "./niggiFavSlice";

export const store = configureStore({
    reducer: {
        niggi: niggiReducer,
        favourites: niggiFavReducer, 
    },
});


