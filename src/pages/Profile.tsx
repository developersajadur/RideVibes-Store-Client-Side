import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { logOutUser } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "@/Hooks/useUser";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";

const Profile = () => {
    const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const {userId} = useUser();
  const {data} = useGetUserQuery(userId);
  const [updateUser] = useUpdateUserMutation()
  const user = data?.data;
//   console.log(user);


  const { register, handleSubmit, reset } = useForm({
    // defaultValues: {
    //   name: user?.name || "N/A",
    //   city: user?.city || "N/A",
    //   address: user?.address || "N/A",
    //   image: user?.profileImage || "N/A",
    // },
  });

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, reset: resetPassword } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const [orders, setOrders] = useState([
    { id: "1234", item: "Mountain Bike", price: "$500", status: "Delivered" },
    { id: "5678", item: "Helmet", price: "$50", status: "Processing" },
  ]);

  const handleLogOut = () => {
    dispatch(logOutUser());
    toast.success("You have successfully logged out");
    navigate("/login");
  };

  const handleProfileUpdate = async (data: any) => {
    try {
      const response = await updateUser(data);
      toast.success("Profile updated successfully!");
      reset();
    } catch (error) {
      console.error("Update Failed:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleChangePassword = (data: any) => {
    console.log("Password Change Data:", data);
    toast.success("Password changed successfully! Logging out...");
    dispatch(logOutUser());
    navigate("/login");
    resetPassword();
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
          <div className="space-y-4 text-center">
            <img
              src={user?.image || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full object-cover border"
            />
            <p className="text-xl font-semibold">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">{user?.phone}</p>
            <p className="text-gray-600">{user?.city}, {user?.address}</p>

            {/* Open Edit Profile Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-blue-600">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="p-6">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-4">
                  <Input type="text" {...register("name")} placeholder="Enter name" className="w-full" />
                  <Input type="text" {...register("city")} placeholder="Enter city" className="w-full" />
                  <Input type="text" {...register("address")} placeholder="Enter address" className="w-full" />
                  <Input type="text" {...register("profileImage")} placeholder="Enter profile image URL" className="w-full" />
                  <Button type="submit" className="w-full bg-blue-600">Update</Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Open Change Password Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-gray-600">Change Password</Button>
              </DialogTrigger>
              <DialogContent className="p-6">
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={handlePasswordSubmit(handleChangePassword)} className="space-y-4">
                  <Input type="password" {...registerPassword("currentPassword")} placeholder="Current Password" className="w-full" />
                  <Input type="password" {...registerPassword("newPassword")} placeholder="New Password" className="w-full" />
                  <Button type="submit" className="w-full bg-gray-600">Change Password</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        {/* Orders Section */}
        <TabsContent value="orders">
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="flex justify-between p-4 bg-gray-100 rounded-lg">
                  <div>
                    <p className="font-semibold">{order.item}</p>
                    <p className="text-sm text-gray-600">Status: {order.status}</p>
                  </div>
                  <p className="font-semibold">{order.price}</p>
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
        <Button onClick={handleLogOut} className="bg-red-500 w-full">Log Out</Button>
      </div>
    </div>
  );
};

export default Profile;
