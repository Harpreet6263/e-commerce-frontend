import axios from "axios";
import Cookies from "js-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../slice/authSlice";
import setAuthToken from "../setAuthToken";

export const addCorusel = createAsyncThunk(
    "addCorusel",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            setAuthToken(Cookies.get("loggedIn"))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_ADDRESS}/api/corusel/create`,
                data,
                config,
            );

            if (res?.data && res.data?.success == true) {
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

export const getCorusel = createAsyncThunk(
    "getCorusel",
    async ({ currentPage, limit}, { dispatch, rejectWithValue }) => {
        try {
            setAuthToken(Cookies.get("loggedIn"))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_ADDRESS}/api/corusel/list?page=${currentPage}&limit=${limit}`,
                config,
            );

            if (res?.data && res.data?.success == true) {
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

export const getActiveCorusel = createAsyncThunk(
    "getActiveCorusel",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            setAuthToken(Cookies.get("loggedIn"))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_ADDRESS}/api/corusel/list-active`,
                config,
            );

            if (res?.data && res.data?.success == true) {
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

export const getCoruselById = createAsyncThunk(
    "getCorusel",
    async (corusel_id, { dispatch, rejectWithValue }) => {
        try {
            setAuthToken(Cookies.get("loggedIn"))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_ADDRESS}/api/corusel/list/${corusel_id}`,
                config,
            );

            if (res?.data && res.data?.success == true) {
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

export const editCorusel = createAsyncThunk(
    "editCorusel",
    async ({formData,row_id}, { dispatch, rejectWithValue }) => {
        try {
            setAuthToken(Cookies.get("loggedIn"))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_ADDRESS}/api/corusel/update/${row_id}`,
                formData,
                config,
            );

            if (res?.data && res.data?.success == true) {
                return res.data;
            } else {
                dispatch(handleError(res?.data?.message));
                return rejectWithValue(res?.data?.message);
            }
        } catch (error) {
            console.log("error ====>", error?.response?.data);
            dispatch(handleError(error?.response?.data?.message));
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const updateCoruselStatus = createAsyncThunk(
    "updateCoruselStatus",
    async ({ data, corusel_id}, { dispatch, rejectWithValue }) => {
        try {
            setAuthToken(Cookies.get("loggedIn"))
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_ADDRESS}/api/corusel/update-status/${corusel_id}`,
                data,
                config,
            );

            if (res?.data && res.data?.success == true) {
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
