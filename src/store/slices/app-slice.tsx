import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetPermissions } from "@/util";

const initialState: AppState = {
  csrfToken: undefined,
  isLoggedIn: false,
  user: undefined,
  abilities: [],
  person: undefined,
  permissions: {},
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCsrfToken: (state, action) => {
      state.csrfToken = action.payload;
    },
    setSignin: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.abilities = action.payload.abilities;
      state.csrfToken = action.payload.csrf_token;
      state.person = action.payload.person_attributes;
      state.permissions = GetPermissions(action.payload.abilities);
    },
    setSignout: (state) => {
      state.isLoggedIn = false;
      state.user = undefined;
      state.abilities = [];
      state.csrfToken = undefined;
      state.person = undefined;
      state.permissions = {};
    },
  },
});
