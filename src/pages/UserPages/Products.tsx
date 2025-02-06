import ProductCard from "@/components/Product/ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { brandOptions, categoryOptions } from "@/utils/product.utils";

type FormData = {
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  availability: string;
};

const Products = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  const { register, handleSubmit, setValue, reset } = useForm<FormData>({
    defaultValues: {
      category: "all",
      brand: "all",
      minPrice: "",
      maxPrice: "",
      availability: "all",
    },
  });

  const [query, setQuery] = useState<{ name: string; value: string | boolean }[]>([]);

  useEffect(() => {
    if (searchQuery) {
      setQuery([{ name: "search", value: searchQuery }]);
    } else {
      setQuery([]);
    }
  }, [searchQuery]);

  const { data } = useGetAllProductsQuery(query.length ? query : []);
  const products = data?.data?.data;

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const { minPrice, maxPrice, ...otherFilters } = formData;
    let newQuery: { name: string; value: string | boolean }[] = [];

    Object.entries(otherFilters).forEach(([key, value]) => {
      if (value !== "all" && value !== "") {
        if (key === "availability") {
          newQuery.push({ name: "inStock", value: value === "available" });
        } else {
          newQuery.push({ name: key, value });
        }
      }
    });

    if (minPrice) newQuery.push({ name: "minPrice", value: String(parseFloat(minPrice)) }); // Cast to string
    if (maxPrice) newQuery.push({ name: "maxPrice", value: String(parseFloat(maxPrice)) }); // Cast to string
    
    if (searchQuery) newQuery.push({ name: "search", value: searchQuery });

    setQuery(newQuery);
  };

  const handleClear = () => {
    reset();
    setQuery([]);
  };

  const filteredProducts = products || [];

  return (
    <div className="mt-3 lg:mt-4 mb-5 lg:mb-5">
      <h2 className="text-2xl lg:text-4xl text-center font-semibold text-primary mb-5">
        All Available Bikes
      </h2>

      {/* Filter Bar */}
      <div className="w-full p-4 border rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Category Select */}
          <Select onValueChange={(value) => setValue("category", value)} defaultValue="all">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Brand Select */}
          <Select onValueChange={(value) => setValue("brand", value)} defaultValue="all">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              {brandOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Range */}
          <div className="flex gap-2 w-full md:w-auto">
            <Input type="number" placeholder="Min Price" {...register("minPrice")} className="w-full md:w-[120px]" />
            <Input type="number" placeholder="Max Price" {...register("maxPrice")} className="w-full md:w-[120px]" />
          </div>

          {/* Availability Select */}
          <Select onValueChange={(value) => setValue("availability", value)} defaultValue="all">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          {/* Submit & Clear Buttons */}
          <Button type="submit" className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white">
            Apply Filters
          </Button>
          <Button type="button" onClick={handleClear} className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white">
            Clear
          </Button>
        </form>
      </div>

      {/* Product Grid */}
      <div className="w-full flex justify-center mt-6">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.length ? (
            filteredProducts.map((product: TProduct) => <ProductCard key={product._id} product={product} />)
          ) : (
            <div>No products found...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
