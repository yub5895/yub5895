import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoard } from "../api/member";

export const updateCount = createAsyncThunk(
  "member/updateCount",
  async (data, thunkAPI) => {
    await getBoard(data);
    thunkAPI.dispatch(fetchCount(data.no));
  }
);

export const fetchCount = createAsyncThunk("member/fetchCount", async (no) => {
  const response = await getBoard(no);
  return response.data;
});

const countSlice = createSlice({
  name: "count",
  initialState: { count: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCount.fulfilled, (state, action) => {
      state.count += 1;
      state.count = action.payload;
    });
  },
});

export const { increase } = countSlice.actions;

export default countSlice;
