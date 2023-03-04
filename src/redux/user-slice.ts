import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface UserState {
  token: number;
  isAuthFormVisible: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  token: 0,
  isAuthFormVisible: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleVisible: (state) => {
      state.isAuthFormVisible = !state.isAuthFormVisible;
    },
    setToken: (state, action: PayloadAction<number>) => {
      state.token = action.payload;
    },
  },
});

export const { toggleVisible, setToken } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserStorage = (state: RootState) => state.users;

export default userSlice.reducer;
