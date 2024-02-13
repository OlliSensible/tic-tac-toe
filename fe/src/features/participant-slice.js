import { createSlice } from "@reduxjs/toolkit";
import { data } from "../mocks/table-data";

const participantSlice = createSlice({
  name: "participants",
  initialState: {
    data: [...data],
  },
  reducers: {
    setParticipant: (state, { payload }) => {
      state.data.push(payload);
    },
    deleteParticipant: (state, { payload }) => {
      state.data = state.data.filter(participant => participant.id !== payload)
    },
    editParticipant: (state, { payload }) => {
      const index = state.data.findIndex(participant => participant.id === payload.id);
      if (index !== -1) {
        state.data[index] = {...state.data[index], ...payload};
      }
    },
  }
});

export const { setParticipant, deleteParticipant, editParticipant } = participantSlice.actions;
export default participantSlice.reducer;