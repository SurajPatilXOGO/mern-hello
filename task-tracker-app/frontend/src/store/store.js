import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Ensure this path is correct

// Future slices will be imported and added here
// import taskReducer from './slices/taskSlice';
// import userReducer from './slices/userSlice';

const rootReducer = {
    auth: authReducer,
    // task: taskReducer, // Example
    // user: userReducer, // Example
};

export const store = configureStore({
    reducer: rootReducer,
    // Middleware can be added here, e.g., for RTK Query or custom middleware
    // devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});

export default store;
