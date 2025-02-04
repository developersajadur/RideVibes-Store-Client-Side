import HomeProducts from "@/components/Home/HomeProducts";
import HomeHeroSection from "@/components/Home/HomeHeroSection";
import HomeReview from "@/components/Home/HomeReview";

const Home = () => {
    return (
        <div className=" px-2 md:px-8 lg:px-10 mt-5 lg:mt-10 mb:5 lg:mb-10">
           <HomeHeroSection/>
           <HomeProducts/>
           <HomeReview/>
        </div>
    );
};

export default Home;