// dummySlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface DummyState {
  isToggled: boolean;
}

const initialState: DummyState = {
  isToggled: false,
};

const dummySlice = createSlice({
  name: "dummy",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isToggled = !state.isToggled;
    },
  },
});

export const { toggle } = dummySlice.actions;
export default dummySlice.reducer;
