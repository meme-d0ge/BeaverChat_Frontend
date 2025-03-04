import {SubmitHandler, useForm} from "react-hook-form";
import {RegisterData, useRegisterUserMutation} from "@/shared/api";
import useToast from "@/entities/toast/model/useToast";

export const UseRegisterForm = () => {
    const [regUser] = useRegisterUserMutation();
    const {register, handleSubmit} = useForm<RegisterData>();

    const {
        showLoadingToast,
        showSuccessToast,
        showErrorToast,
        removeToast,
    } = useToast();

    const onSubmit: SubmitHandler<RegisterData> = async (registerUser) => {
        const id = showLoadingToast()
        const {data, error} = await regUser({
            displayName: registerUser.displayName,
            username: registerUser.username,
            password: registerUser.password,
        } as RegisterData)
        removeToast(id)

        if (error){
            showErrorToast(error.data.message)
        } else if (data){
            showSuccessToast('Register successful')
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
    }
};