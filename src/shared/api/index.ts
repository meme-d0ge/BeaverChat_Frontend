export {
    useGetUserQuery,
    useRegisterUserMutation,
    usePatchUserMutation,
    useDeleteUserMutation
} from '@/shared/api/user/user.api';

export {
    useGetProfileQuery,
    useGetProfileByUsernameQuery
} from '@/shared/api/profile/profile.api'

export {
    useLoginMutation,
    useLogoutMutation
} from '@/shared/api/auth/auth.api'


export type {LoginData} from "@/shared/api/auth/auth.api";
export type {UpdateProfileData} from "@/shared/api/profile/profile.api";
export type {RegisterData, PatchData, DeleteData} from "@/shared/api/user/user.api";
