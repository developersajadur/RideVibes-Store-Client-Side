import ProductCard from "@/components/Product/ProductCard";

const HomeBicycles = () => {
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
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default HomeBicycles;
