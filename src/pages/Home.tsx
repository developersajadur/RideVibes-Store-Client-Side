import HomeBicycles from "@/components/layouts/Home/HomeBicycles";
import HomeHeroSection from "@/components/layouts/Home/HomeHeroSection";

const Home = () => {
    return (
        <div className=" px-2 md:px-8 lg:px-10 mt-5 lg:mt-10 mb:5 lg:mb-10">
           <HomeHeroSection/>
           <HomeBicycles/>
        </div>
    );
};

export default Home;