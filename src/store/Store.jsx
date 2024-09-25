import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User/User";


const store = configureStore({
  reducer: {
    user: UserReducer
  }
})

export default store