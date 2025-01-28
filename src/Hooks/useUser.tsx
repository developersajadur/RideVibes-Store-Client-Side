import { TUser, useCurrentUser } from "@/redux/features/auth/authSlice"
import { useAppSelector } from "@/redux/hooks"

export const useUser = () => {
    const user = useAppSelector(useCurrentUser) as TUser;
    return user;
}