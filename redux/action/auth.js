import axios from "axios";
import Cookies from "js-cookie";
import { handleError, loadUser, logoutSuccess, successResponse } from "../slice/authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import setAuthToken from "../setAuthToken";
import sessionExpired from "../sessionExpired";

export const signInWithGoogle = createAsyncThunk(
    "signInWithGoogle",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_ADDRESS}/api/user/exchangeToken`,
                data,
            );

            if (res?.data && res.data?.success == true) {

                    dispatch(loadUser(res.data?.data?.user));
                    dispatch(successResponse(res.data?.message));
                    Cookies.set("loggedIn", res?.data?.data?.token);
                    Cookies.set("role", res?.data?.data?.user?.role);
                    return res.data;

            } else {
                dispatch(handleError(res?.data?.message));
                return rejectWithValue(res?.data?.message);
            }
        } catch (error) {
            console.log("error ====>", error?.response?.data);
            dispatch(handleError(error?.response?.data?.message));

            //  dispatch(handleError(error.message));
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const myProfile = createAsyncThunk(
    "myProfile",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            setAuthToken(Cookies.get("loggedIn"))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_ADDRESS}/api/user/getUser`,
                config,
            );

            if (res?.data && res.data?.success == true) {
                // dispatch(successResponse(res.data?.message));
                dispatch(loadUser(res.data?.data));
                return res.data;
            } else {
                dispatch(handleError(res?.data?.message));
                return rejectWithValue(res?.data?.message);
            }
        } catch (error) {
            console.log("API error occurred:", error?.response);
            dispatch(handleError(error?.response?.data?.message));
            sessionExpired(error?.response?.data, dispatch);
            return rejectWithValue(error?.response?.data);
        }
    }
);


// 
export const handleLogout = createAsyncThunk(
    "handleLogout",
    async (args, { dispatch, rejectWithValue }) => {
        try {
            Cookies.remove("loggedIn");
            Cookies.remove("role");
            dispatch(logoutSuccess("Logout successful"));
            return true
        } catch (error) {
            return false
        }
    }
);