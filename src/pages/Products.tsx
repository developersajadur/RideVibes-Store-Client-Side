import ProductCard from "@/components/Product/ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import { TProduct } from "@/types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Products = () => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      category: "all", // Default value as "all"
      brand: "all", // Default value as "all"
      minPrice: "", // Default empty
      maxPrice: "", // Default empty
      availability: "all",
    },
  });

  const [query, setQuery] = useState<any>([]);

  const { data } = useGetAllProductsQuery(query.length ? query : undefined);
  const products = data?.data?.data;

  const onSubmit = (formData: any) => {
    const { minPrice, maxPrice, ...otherFilters } = formData;

    const newQuery = Object.entries(otherFilters)
      .filter(([key, value]) => value !== "all" && value !== "") // Ignore "all" and empty values
      .map(([key, value]) => {
        if (key === "availability") {
          // Map availability to boolean (inStock)
          return {
            name: "inStock",
            value: value === "available" ? true : value === "out_of_stock" ? false : undefined,
          };
        }
        return { name: key, value: value as string | number };
      })
      .filter(query => query.value !== undefined); // Remove undefined values from the query

    if (minPrice !== "") {
      newQuery.push({
        name: "minPrice",
        value: parseFloat(minPrice), // Convert minPrice to number
      });
    }

    if (maxPrice !== "") {
      newQuery.push({
        name: "maxPrice",
        value: parseFloat(maxPrice), // Convert maxPrice to number
      });
    }

    setQuery(newQuery); // Set the query with the valid filters
    console.log("Applied Filters:", newQuery);
  };

  const handleClear = () => {
    reset(); // Reset the form
    setQuery([]); // Clear the filters
  };

  const applyFilters = (product: TProduct) => {
    let isWithinPriceRange = true;

    // Apply price range filter if minPrice or maxPrice is set
    const minPrice = query.find((q: any) => q.name === "minPrice")?.value;
    const maxPrice = query.find((q: any) => q.name === "maxPrice")?.value;

    if (minPrice && product.price < minPrice) {
      isWithinPriceRange = false;
    }

    if (maxPrice && product.price > maxPrice) {
      isWithinPriceRange = false;
    }

    // Apply availability filter if set
    const availabilityFilter = query.find((q: any) => q.name === "inStock")?.value;
    if (availabilityFilter !== undefined && product.inStock !== availabilityFilter) {
      isWithinPriceRange = false;
    }

    // Apply category and brand filters
    const categoryFilter = query.find((q: any) => q.name === "category")?.value;
    const brandFilter = query.find((q: any) => q.name === "brand")?.value;

    if (categoryFilter && product.category !== categoryFilter) {
      isWithinPriceRange = false;
    }

    if (brandFilter && product.brand !== brandFilter) {
      isWithinPriceRange = false;
    }

    return isWithinPriceRange;
  };

  const filteredProducts = products?.filter(applyFilters);

  return (
    <div className="mt-3 lg:mt-4 mb-5 lg:mb-5">
      <h2 className="text-2xl lg:text-4xl text-center font-semibold text-primary mb-5">
        All Available Bikes
      </h2>

      {/* Filter Bar */}
      <div className="w-full p-4 border rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Category Select */}
          <Select onValueChange={(value) => setValue("category", value)} defaultValue="">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="cruiser">Cruiser</SelectItem>
              <SelectItem value="naked">Naked</SelectItem>
            </SelectContent>
          </Select>

          {/* Brand Select */}
          <Select onValueChange={(value) => setValue("brand", value)} defaultValue="">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="yamaha">Yamaha</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="ktm">KTM</SelectItem>
              <SelectItem value="suzuki">Suzuki</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range */}
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              type="number"
              placeholder="Min Price"
              {...register("minPrice")}
              className="w-full md:w-[120px]"
            />
            <Input
              type="number"
              placeholder="Max Price"
              {...register("maxPrice")}
              className="w-full md:w-[120px]"
            />
          </div>

          {/* Availability Select */}
          <Select onValueChange={(value) => setValue("availability", value)} defaultValue="">
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
          {filteredProducts?.length ? (
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
