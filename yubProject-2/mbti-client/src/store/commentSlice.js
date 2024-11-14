import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addComment, getComments } from "../api/comment";

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (data, thunkAPI) => {
    await addComment(data);
    thunkAPI.dispatch(fetchComment(data.no));
  }
);

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (no) => {
    const response = await getComments(no);
    return response.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: { comments: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default commentSlice;
