import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  loginModal: false,
  successResponse: {
    success: false,
    message: "",
  },
  globalErrorAlert: {
    success: false,
    message: "",
  },
  sessionExpired: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
      state.sessionExpired = false;
      state.loginModal = false;
    },
    logoutSuccess: (state, action) => {
      toast.success(action.payload);
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.sessionExpired = false;
    },
    successResponse: (state, action) => {
      toast.success(action.payload);
      state.successResponse = action.payload;
      state.globalErrorAlert = {};
      state.loading = false;
    },
    handleError: (state, action) => {
      toast.error(action.payload);
      state.successResponse = {};
      state.globalErrorAlert = action.payload;
      state.loading = false;
    },
    handleLoginModal: (state, action) => {
      state.loginModal = action.payload;
    },
  },
});

export const { successResponse, handleError,loadUser,logoutSuccess, handleLoginModal } = authSlice.actions;

export default authSlice.reducer;
