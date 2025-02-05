import ProductCard from "@/components/layouts/ProductCard";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types";
import { Link } from "react-router-dom";

const HomeProducts = () => {
  const {data} = useGetAllProductsQuery([
    { name: 'limit', value: 8}
  ])
  const products = data?.data?.data;
  // console.log(products);
  return (
    <div className="mt-5 lg:mt-10 mb-5 lg:mb-10">
      <div className="text-center mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-4xl font-semibold text-primary">
          Bicycles For Every Adventure
        </h2>
        <p className="text-sm mt-2 max-w-3xl mx-auto">
          Discover our versatile range of bicycles, designed to suit every
          adventure—whether you're cruising the city streets or exploring
          rugged trails.
        </p>
      </div>
      <div className="w-full flex justify-center">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {
            products?.map((product: TProduct) => (
              <ProductCard key={product._id} product={product} />
            )) || <div>Loading...</div>
          }
        </div>
      </div>
      <div className="flex justify-center mt-6 lg:mt-10">
        <Link to='/bicycles'>
          <Button className="text-primary bg-secondary">
            View All Bicycles
          </Button>
          </Link>
        </div>
    </div>
  );
};

export default HomeProducts;
