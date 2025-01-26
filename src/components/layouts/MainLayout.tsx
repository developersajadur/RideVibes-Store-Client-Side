import Navbar from "@/components/shared/Navbar";
import TopNavbar from "@/components/shared/TopNavbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header>
        <div className="w-full">
          <TopNavbar />
          <Navbar />
        </div>
      </header>

      <section>
        <Outlet />
      </section>

      <footer></footer>
    </div>
  );
};

export default MainLayout;
