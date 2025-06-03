import axios from "axios";
import Cookies from "js-cookie";
import { handleError, loadUser, logoutSuccess, successResponse } from "../slice/authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategorywithSubcategory = createAsyncThunk(
    "getCategorywithSubcategory",
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_ADDRESS}/api/category/listwithsubcategory`,
                data,
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

