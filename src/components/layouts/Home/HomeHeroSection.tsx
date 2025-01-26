import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

const HomeHeroSection = () => {
  return (
    <div>
      <div className="flex items-center gap-8 h-96 w-full bg-red-50">
        <div className="w-1/2">
          <Swiper
            spaceBetween={2}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000, // Adjust delay time (in milliseconds)
              disableOnInteraction: false,
            }}
            loop={true} // Enables infinite loop
            freeMode={true} // Allows hand slide control
            touchEventsTarget="container" // Enables touch controls
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide
              style={{
                backgroundImage: "url(/src/assets/bicycle-slider-1.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
              }}
              className="h-96"
            >
              {/* <img className="h-fit" src="/src/assets/bicycle-slider-1.jpg" alt="Slide 1" /> */}
              
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="w-1/2 flex flex-col gap-8 items-center">
          <div className="">1</div>
          <div className="">2</div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
