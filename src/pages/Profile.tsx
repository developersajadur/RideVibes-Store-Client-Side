import { Button } from "@/components/ui/button";
import { logOutUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

const handleLogOut = () => {
    dispatch(logOutUser())
    toast.success('You have successfully logged out')
    navigate('/login')
}

    return (
        <div className="my-20">
          <Button onClick={handleLogOut} className="bg-secondary text-primary">Log Out</Button>
        </div>
    );
};

export default Profile;