import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { status } from "http-status";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { logOutUser } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "@/Hooks/useUser";
import {
    useChangePasswordMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { useGetMyOrdersQuery } from "@/redux/features/order/orderApi";

const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/devsajadurrahman/image/upload";
const UPLOAD_PRESET = "sajadurrahmanpresent";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useUser();
  const { data, refetch } = useGetUserQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation()
  const {data: orders} = useGetMyOrdersQuery({})
  console.log(orders);
  const user = data?.data;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name || "",
      city: user?.city || "",
      address: user?.address || "",
    },
  });
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
  } = useForm();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.profileImage || null
  );
  const [loading, setLoading] = useState(false);

//   const [orders, setOrders] = useState([
//     { id: "1234", item: "Mountain Bike", price: "$500", status: "Delivered" },
//     { id: "5678", item: "Helmet", price: "$50", status: "Processing" },
//   ]);

  const handleLogOut = () => {
    dispatch(logOutUser());
    toast.success("You have successfully logged out");
    navigate("/login");
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      toast.error("Image upload failed.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (data: any) => {
    let uploadedImageUrl = previewImage;
  
    // Only upload the image if a new one is selected
    if (selectedImage) {
      uploadedImageUrl = await uploadImageToCloudinary(selectedImage);
    }
  
    // Create a new object with only the updated fields
    const updatedData: any = {};
  
    // Conditionally add fields to the update data if they're not null or empty
    if (data.name) updatedData.name = data.name;
    if (data.city) updatedData.city = data.city;
    if (data.address) updatedData.address = data.address;
    if (uploadedImageUrl) updatedData.profileImage = uploadedImageUrl;
  
    // Only proceed if there's data to update
    if (Object.keys(updatedData).length === 0) {
      toast.error("No changes detected.");
      return;
    }
  
    try {
      // Send the updated fields to the backend
      const res = await updateUser(updatedData);
      if(res){
        toast.success("Profile updated successfully.");
        reset();
        setSelectedImage(null);
        setPreviewImage(null);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };
  

  const handleChangePassword = async (data: any) => {
    try {
      const changedPassword = await changePassword(data);
  
      // Ensure error exists and is an object with a status property
      if (changedPassword?.error && typeof changedPassword.error === "object") {
        if ("status" in changedPassword.error) {
          if (changedPassword.error.status === status.UNAUTHORIZED) {
            toast.error("Invalid current password!");
            return;
          } else if (changedPassword.error.status === status.BAD_REQUEST) {
            toast.error("New password cannot be the same as the current password!");
            return;
          }
        }
      }
  
      // If no error, show success message
      if (changedPassword) {
        toast.success("Password changed successfully!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to change password. Please try again.");
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-xl">
      <Tabs defaultValue="profile">
        {/* Tab Navigation */}
        <TabsList className="flex justify-center space-x-4 border-b">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* Profile Section */}
        <TabsContent value="profile">
          <div className="space-y-2 text-center">
            <img
              src={previewImage || user?.profileImage}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full object-cover border"
            />
            <p className="text-xl font-semibold">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">{user?.phone}</p>
            <p className="text-gray-600">
              {user?.city}, {user?.address}
            </p>

            {/* Edit Profile Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-blue-600">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="p-6">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(handleProfileUpdate)}
                  className="space-y-4"
                >
                  <Input
                    type="text"
                    {...register("name")}
                    placeholder="Enter name"
                    className="w-full"
                  />
                  <Input
                    type="text"
                    {...register("city")}
                    placeholder="Enter city"
                    className="w-full"
                  />
                  <Input
                    type="text"
                    {...register("address")}
                    placeholder="Enter address"
                    className="w-full"
                  />

                  {/* File Input for Profile Image */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border p-2 rounded-md"
                  />

                  <Button
                    type="submit"
                    className="w-full bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Update"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Change Password Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-gray-600">Change Password</Button>
              </DialogTrigger>
              <DialogContent className="p-6">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handlePasswordSubmit(handleChangePassword)}
                  className="space-y-4"
                >
                  <Input
                    type="password"
                    {...registerPassword("currentPassword")}
                    placeholder="Current Password"
                    className="w-full"
                  />
                  <Input
                    type="password"
                    {...registerPassword("newPassword")}
                    placeholder="New Password"
                    className="w-full"
                  />
                  <Button type="submit" className="w-full bg-gray-600">
                    Change Password
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        {/* Orders Section */}
        <TabsContent value="orders">
  <div className="space-y-4">
    {orders?.data && orders.data.length > 0 ? (
      orders.data.map((order: any) => (
        <div
          key={order?._id}
          className="flex justify-between p-4 bg-gray-100 rounded-lg"
        >
          <div>
            <p className="font-semibold">Transaction Id: {order?.transaction?.id}</p>
            <p className="text-sm text-gray-600">
              Status: {order?.status}
            </p>
          </div>
          <p className="font-semibold">Amount: {order?.totalPrice} BDT</p>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No orders found.</p>
    )}
  </div>
</TabsContent>

      </Tabs>

      {/* Logout Button */}
      <div className="mt-6 text-center">
        <Button onClick={handleLogOut} className="bg-red-500 w-full">
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
