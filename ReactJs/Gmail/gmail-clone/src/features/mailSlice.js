import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    selectedMail: null,
    sendMessageIsOpen: false,
  },
  reducers: {
    selectedMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    openSendMessage: (state, action) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state, action) => {
      state.sendMessageIsOpen = false;
    },
  },
});

export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
export const selectedOpenMail = (state) => state.mail.selectedMail; 
export const {selectedMail, openSendMessage, closeSendMessage } = mailSlice.actions;

export default mailSlice.reducer;
