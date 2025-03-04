import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {api} from "@/shared/api/api";
import {setupListeners} from "@reduxjs/toolkit/query";
import cookieSlice from "../../entities/cookie";

const rootReducer = combineReducers({
    cookie: cookieSlice,
    [api.reducerPath]: api.reducer,
})

export const store =  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: true,
})
setupListeners(store.dispatch)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch