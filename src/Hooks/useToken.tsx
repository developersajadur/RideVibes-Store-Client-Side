import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

export const useToken = () => {
    const token = useAppSelector(useCurrentToken);
    return token;
}