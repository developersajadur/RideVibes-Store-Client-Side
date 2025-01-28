import HomeProducts from "@/components/layouts/Home/HomeProducts";
import HomeHeroSection from "@/components/layouts/Home/HomeHeroSection";
import HomeReview from "@/components/layouts/Home/HomeReview";

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