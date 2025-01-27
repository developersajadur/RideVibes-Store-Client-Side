import Navbar from "@/components/shared/Navbar";
import TopNavbar from "@/components/shared/TopNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <header>
        <div className="w-full">
          <TopNavbar />
          <Navbar />
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default MainLayout;
