import { createSlice } from "@reduxjs/toolkit";

const hotSlice = createSlice({
  name: "hotPost",
  initialState: {
    time: 0,
    hidden: false,
  },
  reducers: {
    hidePost: (state) => {
      state.hidden = true;
    },
    addHotPost: (state, action) => {
      state.time = action.payload;
      state.hidden = false;
    },
  },
});

export const { hidePost, addHotPost } = hotSlice.actions;
export default hotSlice;
