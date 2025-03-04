import {createSlice} from "@reduxjs/toolkit";
import {getStatusCookie, setStatusCookie} from "@/entities/cookie/model/utils";
import {StatusCookie} from "@/entities/cookie/model/interface";

interface CookieStateInterface {
    isAccepted: StatusCookie;
}
const initialState: CookieStateInterface = {
    isAccepted: getStatusCookie() || StatusCookie.notAccepted,
}
export const cookieSlice = createSlice({
    name: "cookie",
    initialState,
    reducers:{
        enableCookiesAccepted(state: CookieStateInterface){
            state.isAccepted = StatusCookie.accepted;
            setStatusCookie(StatusCookie.accepted)
        },
        disableCookiesAccepted(state: CookieStateInterface){
            state.isAccepted = StatusCookie.notAccepted;
            setStatusCookie(StatusCookie.notAccepted)
        }
    }
})

export const { disableCookiesAccepted, enableCookiesAccepted } = cookieSlice.actions
export default cookieSlice.reducer