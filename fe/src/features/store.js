import { configureStore } from "@reduxjs/toolkit";
import participantReducer from "./participant-slice"

const store = configureStore({
  reducer: {
    participants: participantReducer,
  },
});

export default store;