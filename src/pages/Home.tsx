import HomeBicycles from "@/components/layouts/Home/HomeBicycles";
import HomeHeroSection from "@/components/layouts/Home/HomeHeroSection";
import HomeReview from "@/components/layouts/Home/HomeReview";

const Home = () => {
    return (
        <div className=" px-2 md:px-8 lg:px-10 mt-5 lg:mt-10 mb:5 lg:mb-10">
           <HomeHeroSection/>
           <HomeBicycles/>
           <HomeReview/>
        </div>
    );
};

export default Home;