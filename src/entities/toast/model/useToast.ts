import {toast} from "sonner";

export const useToast = () => {
    const removeToast= (id: number) => {
        toast.dismiss(id)
    }

    const showLoadingToast = (): number => {
        return Number(toast.loading("Status:", {
            description: "Loading...",
            position: "bottom-left",
            style: {
                fontWeight: "bold",
                color: 'yellow',
            },
            action: {
                label: "Close",
                onClick: () => {
                },
            },
        }))
    };
    const showSuccessToast = (message: string): number => {
        return Number(toast.success("Status:", {
            description: `${message}`,
            position: "bottom-left",
            style: {
                fontWeight: "bold",
                color: 'green',
            },
            action: {
                label: "Close",
                onClick: () => {
                },
            },
        }))
    };
    const showErrorToast = (error: string): number => {
        return Number(toast.error("Status:", {
            description: `${error}`,
            position: "bottom-left",
            style: {
                fontWeight: "bold",
                color: 'red',
            },
            action: {
                label: "Close",
                onClick: () => {
                },
            },
        }))
    };

    return {
        removeToast,
        showLoadingToast,
        showSuccessToast,
        showErrorToast
    };
};

export default useToast;