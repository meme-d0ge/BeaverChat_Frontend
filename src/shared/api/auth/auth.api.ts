import {api} from "@/shared/api/api";

export interface LoginData {
    username: string;
    password: string;
}
const authApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (payload: LoginData)  => ({
                body: payload,
                url: '/auth/login',
                method: 'POST',
            })
        }),
        logout: builder.mutation({
            query: ()  => ({
                url: '/auth/logout',
                method: 'DELETE',
            })
        })
    })
})
export const {useLoginMutation, useLogoutMutation} = authApi;


