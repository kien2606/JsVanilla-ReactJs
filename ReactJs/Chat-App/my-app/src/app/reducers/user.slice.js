import firebase from "../../api/firestore";
import { createSlice } from "@reduxjs/toolkit";

export const realTimeUser = (uid) => {
  return async (dispatch) => {
    dispatch(GET_REALTIME_USER_REQUEST());
    const db = firebase.firestore();
    db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid != uid) {
          users.push(doc.data());
        }
      });
      dispatch(GET_REALTIME_USER_SUCCEEDED(users));
    });
  };
};

const userReducer = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    GET_REALTIME_USER_REQUEST: (state, action) => {},
    GET_REALTIME_USER_SUCCEEDED: (state, action) => {
      console.log(action.payload);
      state.users = action.payload;
    },
    GET_REALTIME_USER_FAILED: (state, action) => {},
  },
});
export const {
  GET_REALTIME_USER_REQUEST,
  GET_REALTIME_USER_SUCCEEDED,
  GET_REALTIME_USER_FAILED,
} = userReducer.actions;
export default userReducer.reducer;
