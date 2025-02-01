import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import { FaRegCommentDots } from "react-icons/fa6";



// Sample review data
const reviews = [
  {
    id: 1,
    review:
      "I have got my bike number in 16 days. Their performance is too good, and their behavior is excellent. Kichu kichu somoy tara ektu busy thakar karo...",
    name: "Badsha Sarder",
    location: "Gazipur, Dhaka, Bangladesh",
    imageUrl: "/path-to-profile-image.jpg",
  },
  {
    id: 2,
    review:
      "I have got my bike number in 16 days. Their performance is too good, and their behavior is excellent. Kichu kichu somoy tara ektu busy thakar karo...",
    name: "Badsha Sarder",
    location: "Gazipur, Dhaka, Bangladesh",
    imageUrl: "/path-to-profile-image.jpg",
  },
  {
    id: 3,
    review:
      "Very satisfied with the service. Received my bike on time and in perfect condition. Highly recommended! The support was great.",
    name: "Rahim Uddin",
    location: "Chittagong, Bangladesh",
    imageUrl: "/path-to-profile-image.jpg",
  },
  {
    id: 4,
    review:
      "Great experience overall. The process was smooth, and they were very helpful throughout. I would definitely recommend them to others.",
    name: "Jamal Khan",
    location: "Sylhet, Bangladesh",
    imageUrl: "/path-to-profile-image.jpg",
  },
];

const HomeReviewSlider = () => {
    const truncateText = (text: string) => {
        const maxLength = 100;
        if (text.length <= maxLength) {
          return text;
        }
        return text.slice(0, maxLength) + "...";
      };
  return (
    <Swiper
      spaceBetween={20}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      className="mySwiper w-full"
    >
      {reviews.map((review) => (
        <SwiperSlide key={review.id} className="flex justify-center">
          <div className="max-w-md bg-white border border-gray-200 rounded-xl p-6 ">
            <p className="text-gray-700 text-base leading-relaxed mb-5">
            {truncateText(review.review)}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={review.imageUrl}
                  alt={review.name}
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {review.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{review.location}</p>
                </div>
              </div>
              <FaRegCommentDots className="text-secondary text-3xl " />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeReviewSlider;
