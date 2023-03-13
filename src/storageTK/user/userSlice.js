import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// асинхронная логика, вызов асинхронных функций с помощью createAsyncThunk
export const fetchUser = createAsyncThunk('user/fetchUser', async function (dataOutside, {
     rejectWithValue, fulfillWithValue, extra: api, getState, dispatch}) {
try {
    const data = await api.getUserInfo()
    return fulfillWithValue(data)
} catch (error) {
    return rejectWithValue(error)
}
})


// начальное состояние
const initialState = {
    data: {},
    loading: false,
    error: null
}


// создание слайса , т.e создание кусочка общего стейта
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
    }
})

export default userSlice.reducer;
