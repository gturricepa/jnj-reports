import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/User";

const initialState: UserState = {
  name: null,
  allowedGroups: [],
  allowedCountries: [],
  allowedSectors: [],
  Nick: null,
  selectedCountry: [],
  Escope: [],
  perspective: "country",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearUser: (_state) => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
