import { useMutation } from "@tanstack/react-query";
import { auth } from "../../api/authApi";

import toast from "react-hot-toast";

export const useForgotPassword = () => {
    const { mutate: forgotPassword, isPending } = useMutation({
        mutationFn: (data: {email: string}) => auth.forgotPassword(data),
        onSuccess: () => {
            toast.success("Password reset email sent successfully");
        },
        onError: error => {
            toast.error(error.message);
            console.error(error)
        }
    });
    
    return { forgotPassword, isPending };
}
