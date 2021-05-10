import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer from '../reducers/auth.slice';
import userReducer from '../reducers/user.slice';
export default configureStore({
    reducer :{
        auth : authReducer,
        user : userReducer,
    },
    middleware : getDefaultMiddleware({
        serializableCheck: false
     }),
});