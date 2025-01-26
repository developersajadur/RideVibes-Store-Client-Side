import HomeHeroSlider from "./HomeHeroSlider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomeHeroSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 w-full bg-red-50">
        {/* Slider Section */}
        <div className="lg:w-1/2 w-full h-[350px] lg:h-[500px]">
          <HomeHeroSlider />
        </div>

        {/* Additional Content Section */}
        <div className="lg:w-1/2 w-full h-[350px] lg:h-[500px] flex flex-col gap-4 lg:gap-8 items-center justify-center">
          <div className="h-1/2 w-full">
            <div
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(7, 2, 17, 0.7) 0%, rgba(7, 2, 17, 0.00) 60%), url(/src/assets/bicycle-pic-5.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
              }}
              className="w-full rounded-md"
            >
              <div className="w-full h-full flex flex-col items-start justify-center rounded-md px-8 bg-black bg-opacity-40">
                <h1 className="text-white text-2xl md:text-3xl font-semibold">
                  Explore Our Collection
                </h1>
                <p className="text-white text-lg md:text-xl mb-4">
                  Find the best bicycles for your adventure needs.
                </p>
                <Link to="/bicycles">
                  <Button className="bg-secondary text-primary text-base font-medium">
                    Discover More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="h-1/2 w-full">
            <div
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(7, 2, 17, 0.7) 0%, rgba(7, 2, 17, 0.00) 60%), url(/src/assets/bicycle-pic-4.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100%",
              }}
              className="w-full rounded-md"
            >
              <div className="w-full h-full flex flex-col items-start justify-center rounded-md px-8 bg-black bg-opacity-40">
                <h1 className="text-white text-2xl md:text-3xl font-semibold">
                  Join the Ride
                </h1>
                <p className="text-white text-lg md:text-xl mb-4">
                  Ready to start your adventure? Get your bike now!
                </p>
                <Link to="/bicycles">
                  <Button className="bg-secondary text-primary text-base font-medium">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
