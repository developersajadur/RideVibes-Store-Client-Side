import ProductCard from "@/components/Product/ProductCard";

const HomeBicycles = () => {
  return (
    <div className=" mt-5 lg:mt-10 mb-5 lg:mb-10">
      <div className="text-center  mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-4xl font-semibold text-primary">
          Bicycles for Every Adventure
        </h2>
        <p className="text-sm mt-2">
          Discover our versatile range of bicycles, designed to suit every
          adventure—whether you're cruising <br /> the city streets or exploring rugged
          trails.
        </p>
      </div>
      <div className="">
       <ProductCard/>
      </div>
    </div>
  );
};

export default HomeBicycles;
