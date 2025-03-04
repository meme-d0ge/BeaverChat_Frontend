import {LoginData, useLoginMutation} from "@/shared/api";
import {SubmitHandler, useForm} from "react-hook-form";
import {useToast} from "@/entities/toast/index";
import {useAppDispatch} from "@/shared/hooks/useAppDispatch";
import {enableCookiesAccepted} from "@/entities/cookie";

export const useLoginForm = () => {
    const dispatch = useAppDispatch()
    const [loginUser] = useLoginMutation();
    const {register, handleSubmit} = useForm<LoginData>();
    const {
        showLoadingToast,
        showSuccessToast,
        showErrorToast,
        removeToast,
    } = useToast();
    const onSubmit: SubmitHandler<LoginData> = async (loginData) => {
        const id = showLoadingToast()
        const {data, error} = await loginUser({
            username: loginData.username,
            password: loginData.password,
        } as LoginData);
        removeToast(id)

        if (error){
            showErrorToast(error.data.message)
        } else if (data){
            showSuccessToast(data.message)
            dispatch(enableCookiesAccepted())
        }
    }

    return {
        register,
        handleSubmit,
        onSubmit,
    }
}
