import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
            // Store in local storage
            localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
            localStorage.setItem('token', action.payload.token);
        },
        clearCredentials(state) {
            state.userInfo = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            // Clear from local storage
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setCredentials, clearCredentials, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
