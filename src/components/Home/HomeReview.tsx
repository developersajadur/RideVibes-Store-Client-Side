import HomeReviewSlider from "./HomeReviewSlider";


const HomeReview = () => {
    return (
        <div className="mt-5 lg:mt-10 mb-5 lg:mb-10">
          <div className="text-center mb-5 lg:mb-8">
        <h2 className="text-2xl lg:text-4xl font-semibold text-primary">
        What Our Customers Say!
        </h2>
        <p className="text-sm mt-2 max-w-3xl mx-auto">
        Hear from our satisfied customers about their experiences with our bicycles, built for every <br /> journey and adventure.
        </p>
      </div>
      <div className="">
        <HomeReviewSlider/>
      </div>
        </div>
    );
};

export default HomeReview;