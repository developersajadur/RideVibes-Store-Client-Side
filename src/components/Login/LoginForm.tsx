import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { toast } from 'sonner';

type TUserData = {
  email: string;
  password: string;
};

const LoginForm = () => {

    const dispatch = useDispatch()
    const [login] = useLoginMutation();
    const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserData>();

  const onSubmit: SubmitHandler<TUserData> = async(userData) => {
    const toastId = toast.loading('Logging in');
    try {
        const res = await login(userData).unwrap();
        // console.log(res);

        const user = verifyToken(res.data.token) as TUser;
        dispatch(setUser({user: user, token: res.data.token}))
        toast.success('Logged in', { id: toastId, duration: 2000 });
        navigate('/');

    } catch (error:any) {
      const errorMessage =
      error?.data?.message || error?.error || "Something went wrong!";
    
    toast.error(errorMessage, { id: toastId, duration: 2000 });
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-primary mb-1">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-secondary text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-primary mb-1">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-secondary text-sm mt-1">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full text-primary bg-secondary">Login</Button>
        </form>

        <p className="text-center text-gray-600 text-sm">
          Don't have an account? <Link to='/register' className="text-secondary">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;