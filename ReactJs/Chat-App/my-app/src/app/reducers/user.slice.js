import firebase from "../../api/firestore";
import { createSlice } from "@reduxjs/toolkit";

// get user that registered except yourself ////////////
export const realTimeUser = (uid) => {
  return async (dispatch) => {
    dispatch(GET_REALTIME_USER_REQUEST());
    const db = firebase.firestore();
    const unsubcribe = db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });
      dispatch(GET_REALTIME_USER_SUCCEEDED(users));
    });
    return unsubcribe;
  };
};
/////update message/////////////////
export const updateMessage = (messageObj) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    db.collection("conversations")
      .add({
        ...messageObj,
        createAt: new Date(),
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message));
  };
};

// get message from firebase for user1 and user2 who chat together

export const getMessage = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    db.collection("conversations")
      .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy('createAt' , 'asc')
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 === user.uid_1 &&
              doc.data().user_uid_2 === user.uid_2) ||
            (doc.data().user_uid_1 === user.uid_2 &&
              doc.data().user_uid_2 === user.uid_1)
          ) {
            conversations.push(doc.data());
          }
        });
        dispatch(UPDATE_REALTIME_MESSAGE(conversations));
      });
  };
};
////////////////////////////////////////// slice user//////////
const userReducer = createSlice({
  name: "user",
  initialState: {
    users: [],
    conversations: [],
  },
  reducers: {
    GET_REALTIME_USER_REQUEST: (state, action) => {},
    GET_REALTIME_USER_SUCCEEDED: (state, action) => {
      state.users = action.payload;
    },
    GET_REALTIME_USER_FAILED: (state, action) => {},
    UPDATE_REALTIME_MESSAGE: (state, action) => {
      state.conversations = action.payload;
    },
  },
});
export const {
  GET_REALTIME_USER_REQUEST,
  GET_REALTIME_USER_SUCCEEDED,
  GET_REALTIME_USER_FAILED,
  UPDATE_REALTIME_MESSAGE
} = userReducer.actions;
export default userReducer.reducer;
