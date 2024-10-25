import { createSlice } from "@reduxjs/toolkit";

const hotSlice = createSlice({
  name: "hotPost",
  initialState: {
    time: true,
    hidden: false,
  },
  reducers: {
    hidePost: (state) => {
      state.time = false;
      state.hidden = true;
    },
  },
});

export const { hidePost } = hotSlice.actions;
export default hotSlice;
