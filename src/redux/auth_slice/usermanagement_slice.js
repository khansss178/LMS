import Axios from 'axios';
import appURL from '../../constants/appURL';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const userMainList = createSlice({
    name: 'usermanagement',
    initialState: {},
    reducers: {
        resetUserSlice(state, action) {
            return { ...state, changeSuccess: undefined, updateSuccess: undefined }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserList.pending, (state, action) => {
                return { ...state, loading: true }
            })
            .addCase(getUserList.fulfilled, (state, action) => {

                return { ...state, loading: false, data: action.payload }
            })
            .addCase(getUserList.rejected, (state, action) => {

                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            });

        builder
            .addCase(addUser.pending, (state, action) => {
                return { ...state, addLoading: true }
            })
            .addCase(addUser.fulfilled, (state, action) => {

                return { ...state, addLoading: false, addData: action.payload, addSuccess: true }
            })
            .addCase(addUser.rejected, (state, action) => {

                return {
                    ...state,
                    addLoading: false,
                    addError: action.payload,
                    addSuccess: false
                }
            });
        builder
            .addCase(updateUser.pending, (state, action) => {
                return { ...state, updateLoading: true }
            })
            .addCase(updateUser.fulfilled, (state, action) => {

                return { ...state, updateLoading: false, updateData: action.payload, updateSuccess: true }
            })
            .addCase(updateUser.rejected, (state, action) => {

                return {
                    ...state,
                    updateLoading: false,
                    updateError: action.payload,
                    updateSuccess: false
                }
            });

    },
});

export default userMainList.reducer;
export const { resetUserSlice } = userMainList.actions;


// Thunks
export const getUserList = createAsyncThunk('userlist/fetch', async (id, { rejectWithValue, fulfillWithValue }) => {

    try {
        const { data } = await Axios.get(appURL.baseUrl + appURL.getUserList);
        // console.log("object", data);
        return fulfillWithValue(data?.data);
    } catch (error) {

        throw rejectWithValue(error.response && error.response.data.message
            ? error.response.data.message
            : error.message)
    }

});
export const addUser = createAsyncThunk('addUserTicket/add', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.post(appURL.baseUrl + appURL.addUser, body);

        return fulfillWithValue(data.data);
    } catch (error) {
        console.log("object", error)
        throw rejectWithValue(error.response && error.response.data.message
            ? error.response.data.message
            : error.message)

    }

});
export const updateUser = createAsyncThunk('updateUser/patch', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.patch(appURL.baseUrl + appURL.updateUser, body);
        return fulfillWithValue(data.data);
    } catch (error) {

        throw rejectWithValue(error.response && error.response.data.message
            ? error.response.data.message
            : error.message)

    }

});