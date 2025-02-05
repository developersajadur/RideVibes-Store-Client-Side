import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "@/redux/features/order/orderApi";
import { TOrder } from "@/types";
import { toast } from "sonner";

const statuses: ("Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled")[] = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];

const ManageOrders = () => {
  // Fetch orders
  const { data, isLoading } = useGetOrdersQuery(undefined);
  const orderList = data?.data;
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId: string, newStatus: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled") => {
    console.log("Order ID:", orderId, "New Status:", newStatus);  // Log status correctly as string
  
    try {
      const res = await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      if(res.success){
        toast.success(`Order status updated to ${newStatus}`)
      }
    } catch (error:any) {
      console.error("Failed to update order status:", error);
      toast.error(error.data.message)
    }
  };
  
  if (isLoading) return <div className="text-center py-4">Loading Orders...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList.map((order: TOrder) => (
                <TableRow key={order._id}>
                  <TableCell>{order.transaction.id}</TableCell>
                  <TableCell>{order.user}</TableCell>
                  <TableCell>
                    {order.products.map((p, index) => (
                      <div key={index}>
                        {p.product} (x{p.quantity})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(newStatus: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled") =>
                        handleStatusChange(order._id, newStatus)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {order.transaction.transactionStatus || "N/A"} - {order.transaction.method}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageOrders;
