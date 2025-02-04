import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useGetSingleProductByIdQuery } from "@/redux/features/product/productApi";
import { useEffect } from "react";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { toast } from "sonner";

const Checkout = () => {
  const params = useParams();
  const { data, isLoading: productLoading, isError: productError } = useGetSingleProductByIdQuery({
    id: params.productId,
  });

  const cartItem = data?.data;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [createOrder, { isLoading: orderLoading, isSuccess, data: orderData, isError, error }] =
    useCreateOrderMutation();

    const handlePlaceOrder = async () => {
      if (!cartItem) return;
    
      const dataToSend = {
        products: [
          {
            product: cartItem._id,
            quantity: 1,
          },
        ],
      };
    
      await createOrder(dataToSend); // ✅ Send correctly formatted data
    };

  const toastId = "cart";
  useEffect(() => {
    if (orderLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(orderData?.message, { id: toastId });
      if (orderData?.data) {
        setTimeout(() => {
          window.location.href = orderData.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [orderData?.data, orderData?.message, error, isError, orderLoading, isSuccess]);

  if (productLoading) return <div>Loading...</div>;
  if (productError || !cartItem) return <div>Error loading product details.</div>;

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div className="p-6 border rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
          <form onSubmit={handleSubmit(handlePlaceOrder)} className="space-y-4">
            <Input {...register("fullName", { required: "Full name is required" })} placeholder="Full Name" required />
            {errors.fullName && <p className="text-red-500">{String(errors.fullName.message)}</p>}

            <Input type="email" {...register("email", { required: "Email is required" })} placeholder="Email" required />
            {errors.email && <p className="text-red-500">{String(errors.email.message)}</p>}

            <Input {...register("address", { required: "Address is required" })} placeholder="Address" required />
            {errors.address && <p className="text-red-500">{String(errors.address.message)}</p>}

            <div className="grid grid-cols-2 gap-4">
              <Input {...register("city", { required: "City is required" })} placeholder="City" required />
              {errors.city && <p className="text-red-500">{String(errors.city.message)}</p>}

              <Input {...register("zip", { required: "ZIP Code is required" })} placeholder="ZIP Code" required />
              {errors.zip && <p className="text-red-500">{String(errors.zip.message)}</p>}
            </div>

            <Input {...register("country", { required: "Country is required" })} placeholder="Country" required />
            {errors.country && <p className="text-red-500">{String(errors.country.message)}</p>}

            <Input {...register("phoneNumber")} placeholder="Phone Number (Optional)" />

            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={orderLoading}>
              {orderLoading ? "Processing..." : "Pay by Aamarpay"}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="p-6 border rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>{cartItem.name} x </span>
              <span>{cartItem.price} BDT</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{cartItem.price} BDT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
