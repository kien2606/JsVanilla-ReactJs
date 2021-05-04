import firebase from "../../api/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk("auth/signin", (user) => {
  const db = firebase.firestore();
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      const currentUser = firebase.auth().currentUser;
      const name = `${data.firstName} ${data.lastName}`;
      currentUser
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          db.collection("users")
            .add({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              uid: data.user.uid,
              createAt: new Date(),
            })
            .then(() => {
              const loggedUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                uid: data.user.uid,
              };
              localStorage.setItem("user", JSON.stringify(loggedUser));
              console.log("done");
            });
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

const authReducer = createSlice({
  name: "auth",
  initialState: {
    accepted: false,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [signup.pending]: (state, action) => {
      state.status = "loading";
      state.accepted = false;
    },
    [signup.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.accepted = true;
    },
    [signup.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.accepted = false;
    },
  },
});

export default authReducer.reducer;
