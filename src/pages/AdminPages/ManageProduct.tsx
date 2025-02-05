import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteProductMutation, useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert

const ManageProduct = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation(); 

  // Check if data is an array before using map
  const products = data?.data?.data || [];

  // Handle product deletion
  const handleDeleteProduct = async (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            const res = await deleteProduct(productId)
            if(res.data.success) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your product has been deleted.",
                    icon: "success"
                  });
            }

        } catch (error) {
            Swal.fire({
                title: "Something went wrong",
                text: "Please try again",
                icon: "error"
              });
        }
      }
    });
  };

  // Handle product update
//   const handleUpdateProduct = (productId: string) => {
//     navigate(`/manage-products/update-product/${productId}`);
//   };

  // Conditional rendering logic
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4 text-red-500">Failed to load products</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>

      {/* Show message if no products are available */}
      {products.length === 0 ? (
        <h2 className="text-xl font-semibold text-gray-600">No products available</h2>
      ) : (
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Stock Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: TProduct) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>{product.price} BDT</TableCell>
                <TableCell>
                    <Link to={`/admin/manage-products/update-product/${product._id}`}>
                  <Button
                    variant="outline"
                  >
                    Update
                  </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteProduct(product._id)} // Delete product
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageProduct;
