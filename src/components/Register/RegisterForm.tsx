import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from 'sonner';

type TRegisterData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const RegisterForm = () => {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterData>();

  const onSubmit: SubmitHandler<TRegisterData> = async (userData) => {
    const toastId = toast.loading("Creating account");
    try {
      const res = await registerUser(userData).unwrap();
      if(res.success){
        toast.success("Account created successfully!", { id: toastId, duration: 2000 });
        navigate("/login");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorMessage, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-primary">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-primary mb-1">Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-secondary text-sm mt-1">{errors.name.message}</p>}
          </div>

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
            <label className="block text-primary mb-1">Phone</label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && <p className="text-secondary text-sm mt-1">{errors.phone.message}</p>}
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

          <Button type="submit" className="w-full text-primary bg-secondary">Register</Button>
        </form>

        <p className="text-center text-gray-600 text-sm">
          Already have an account? <Link to='/login' className="text-secondary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;