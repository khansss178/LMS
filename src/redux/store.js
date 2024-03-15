import { configureStore } from '@reduxjs/toolkit';
import loginUserReducer from "./auth_slice/login_user_slice"

const user = localStorage.getItem("user");
const initialState = {
    loginUser: {
        user: user ? JSON.parse(user) : undefined
    }
};
const store = configureStore({
    reducer: {
        loginUser: loginUserReducer,

    },
    preloadedState: initialState
},
)



export default store;