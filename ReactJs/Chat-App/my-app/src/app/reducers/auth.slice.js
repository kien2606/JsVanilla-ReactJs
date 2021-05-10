import firebase from "../../api/firestore";
import { createSlice } from "@reduxjs/toolkit";

///////////////////////action signin/////////////////////////////////////////////////////

export const signin = (user) => {
  return async (dispatch) => {
    dispatch(LOGIN_REQUEST());
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const db = firebase.firestore();
        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName.split(" ");
            const firstName = name[0];
            const lastName = name[1];
            const loggedUser = {
              firstName,
              lastName,
              email: user.email,
              uid: data.user.uid,
            };
            sessionStorage.setItem("user", JSON.stringify(loggedUser));
            dispatch(LOGIN_SUCCEEDED(loggedUser));
          })
          .catch((error) => error.message);
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(LOGGIN_FAILED(error));
      });
  };
};

//////////////////////////////////////action signup////////////////////////////////////////////////

export const signup = (user) => {
  return async (dispatch) => {
    dispatch(LOGIN_REQUEST());
    const db = firebase.firestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const currentUser = firebase.auth().currentUser;
        const name = `${user.firstName} ${user.lastName}`;
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            db.collection("users")
              .doc(data.user.uid)
              .set({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                uid: data.user.uid,
                createAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                const loggedUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  uid: data.user.uid,
                };
                sessionStorage.setItem("user", JSON.stringify(loggedUser));
                dispatch(LOGIN_SUCCEEDED(loggedUser));
              });
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch(LOGGIN_FAILED(error));
      });
  };
};

/////////////////middleware check logged in //////////////////////////////////////////

export const isLoggedIn = () => {
  return async (dispatch) => {
    const user = sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
    if (user) {
      dispatch(LOGIN_SUCCEEDED(user));
    } else {
      dispatch(LOGGIN_FAILED());
    }
  };
};

///////////////////////////////action logout//////////////////////////////////////////

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch(LOGOUT_REQUEST());
    const db = firebase.firestore();
    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            const initialValue = {
              firstName: "",
              lastName: "",
              email: "",
              accepted: false,
              error: null,
            };
            dispatch(LOGOUT_SUCCEEDED(initialValue));
            sessionStorage.clear();
          })
          .catch((error) => {
            console.log(error);
            dispatch(LOGOUT_FAILED(error));
          });
      })
      .catch((error) => console.log(error.message));
  };
};
/////////////////////////////////////////

/////////////////////////////////auth slice////////////////////////////////////////

const authReducer = createSlice({
  name: "auth",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    accepted: false,
    error: null,
  },
  reducers: {
    LOGIN_REQUEST: (state, action) => {
      state.accepted = false;
    },
    LOGIN_SUCCEEDED: (state, action) => {
      state.accepted = true;
      if (action.payload) {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
      }
    },
    LOGGIN_FAILED: (state, action) => {
      state.error = action.payload;
      state.accepted = false;
    },
    LOGOUT_REQUEST: (state, action) => {},
    LOGOUT_SUCCEEDED: (state, action) => {
      return { ...state, ...action.payload };
    },
    LOGOUT_FAILED: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  LOGIN_REQUEST,
  LOGIN_SUCCEEDED,
  LOGGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCEEDED,
  LOGOUT_FAILED,
} = authReducer.actions;

export default authReducer.reducer;
