import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/authsliice.js'
const store = configureStore({
    reducer:{
        auth : authSliceReducer
    },
    devTools:true
});
export default store