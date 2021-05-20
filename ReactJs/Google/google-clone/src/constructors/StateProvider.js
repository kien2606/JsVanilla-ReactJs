import React, { createContext, useContext, useReducer } from "react";

// make contextApi

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// state use for all children in app allows pull information

export const useStateValue = () => useContext(StateContext);
