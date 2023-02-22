import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	product: productSlice.reducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
