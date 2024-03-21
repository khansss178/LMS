
import Axios from 'axios';
import appURL from '../../constants/appURL';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const clientMainList = createSlice({
    name: 'clientmanagement',
    initialState: {},
    reducers: {
        resetUserSlice(state, action) {
            return { ...state, changeSuccess: undefined, updateSuccess: undefined }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getClientList.pending, (state, action) => {
                return { ...state, loading: true }
            })
            .addCase(getClientList.fulfilled, (state, action) => {

                return { ...state, loading: false, data: action.payload }
            })
            .addCase(getClientList.rejected, (state, action) => {

                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            });

        builder
            .addCase(addClient.pending, (state, action) => {
                return { ...state, addLoading: true }
            })
            .addCase(addClient.fulfilled, (state, action) => {

                return { ...state, addLoading: false, addData: action.payload, addSuccess: true }
            })
            .addCase(addClient.rejected, (state, action) => {

                return {
                    ...state,
                    addLoading: false,
                    addError: action.payload,
                    addSuccess: false
                }
            });
        builder
            .addCase(updateClient.pending, (state, action) => {
                return { ...state, updateLoading: true }
            })
            .addCase(updateClient.fulfilled, (state, action) => {

                return { ...state, updateLoading: false, updateData: action.payload, updateSuccess: true }
            })
            .addCase(updateClient.rejected, (state, action) => {

                return {
                    ...state,
                    updateLoading: false,
                    updateError: action.payload,
                    updateSuccess: false
                }
            });

    },
});

export default clientMainList.reducer;
export const { resetUserSlice } = clientMainList.actions;


// Thunks
export const getClientList = createAsyncThunk('userlist/fetch', async (id, { rejectWithValue, fulfillWithValue }) => {

    try {
        const { data } = await Axios.get(appURL.baseUrl + appURL.getClientList);
        // console.log("object", data);
        return fulfillWithValue(data?.data);
    } catch (error) {

        throw rejectWithValue(error.response && error.response.data.message
            ? error.response.data.message
            : error.message)
    }

});
export const addClient = createAsyncThunk('addClientTicket/add', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.post(appURL.baseUrl + appURL.addClient, body);

        return fulfillWithValue(data.data);
    } catch (error) {
        console.log("object", error)
        throw rejectWithValue(error.response && error.response.data.message
            ? error.response.data.message
            : error.message)

    }

});
export const updateClient = createAsyncThunk('updateClient/patch', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.patch(appURL.baseUrl + appURL.updateClient, body);
        return fulfillWithValue(data.data);
    } catch (error) {

        throw rejectWithValue(error.response && error.response.data.message
            ? error.response.data.message
            : error.message)

    }

});
