import Axios from 'axios';
import appURL from '../../constants/appURL';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const supportMainList = createSlice({
    name: 'supportListView',
    initialState: {},
    reducers: {
        resetSupportSlice(state, action) {
            return { ...state, changeSuccess: undefined, updateSuccess: undefined }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSupportList.pending, (state, action) => {
                return { ...state, loading: true }
            })
            .addCase(getSupportList.fulfilled, (state, action) => {

                return { ...state, loading: false, data: action.payload }
            })
            .addCase(getSupportList.rejected, (state, action) => {

                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            });

        // builder
        //     .addCase(addDepCategory.pending, (state, action) => {
        //         return { ...state, changeLoading: true }
        //     })
        //     .addCase(addDepCategory.fulfilled, (state, action) => {

        //         return { ...state, changeLoading: false, changeData: action.payload, changeSuccess: true }
        //     })
        //     .addCase(addDepCategory.rejected, (state, action) => {

        //         return {
        //             ...state,
        //             changeLoading: false,
        //             changeError: action.payload,
        //             changeSuccess: false
        //         }
        //     });
        // builder
        //     .addCase(updateDepCategory.pending, (state, action) => {
        //         return { ...state, updateLoading: true }
        //     })
        //     .addCase(updateDepCategory.fulfilled, (state, action) => {

        //         return { ...state, updateLoading: false, updateData: action.payload, updateSuccess: true }
        //     })
        //     .addCase(updateDepCategory.rejected, (state, action) => {

        //         return {
        //             ...state,
        //             updateLoading: false,
        //             updateError: action.payload,
        //             updateSuccess: false
        //         }
        //     });

    },
});

export default supportMainList.reducer;
export const { resetSupportSlice } = supportMainList.actions;


// Thunks
export const getSupportList = createAsyncThunk('supportlist/fetch', async (id, { rejectWithValue, fulfillWithValue }) => {

    try {
        const { data } = await Axios.get(appURL.baseUrl + appURL.getSupportList);
        // console.log("object", data);
        return fulfillWithValue(data?.data);
    } catch (error) {

        throw rejectWithValue(error.response && error.response.data.message
            ? error.response.data.message
            : error.message)
    }

});
// export const addDepCategory = createAsyncThunk('complaintCategory/add', async (body, { rejectWithValue, fulfillWithValue }) => {
//     try {
//         const { data } = await Axios.post(appURL.baseUrl + appURL.addDepCategory, body);
//         return fulfillWithValue(data.data);
//     } catch (error) {

//         throw rejectWithValue(error.response && error.response.data.msg
//             ? error.response.data.msg
//             : error.message)

//     }

// });
// export const updateDepCategory = createAsyncThunk('updateDepCategory/patch', async (body, { rejectWithValue, fulfillWithValue }) => {
//     try {
//         const { data } = await Axios.patch(appURL.baseUrl + appURL.updateDepCategory, body);
//         return fulfillWithValue(data.data);
//     } catch (error) {

//         throw rejectWithValue(error.response && error.response.data.msg
//             ? error.response.data.msg
//             : error.message)

//     }

// });
