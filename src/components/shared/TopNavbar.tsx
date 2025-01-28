import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const TopNavbar = () => {

    return (
        <div className="bg-secondary w-full px-2 md:px-8 lg:px-10 py-2 hidden md:block lg:block">
            <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center text-primary">
            <h5 className="flex items-center justify-center"><IoLocationSharp /> Dinajpur, Bangladesh</h5>
            <h5 className="flex items-center justify-center"><FaPhoneAlt /> +8801787448412</h5>
        </div>

        <div className="flex gap-5 items-center">
        <div className="flex gap-5 text-primary text-sm font-medium">
                   <NavLink to='/bicycles'>Bicycles</NavLink>
                   <NavLink to='/about-us'>About Us</NavLink>
                   <NavLink to='/contact-us'>Contact Us</NavLink>
                   <NavLink to='/Blogs'>Blogs</NavLink>
                   {/* <NavLink to='/login'>Login</NavLink> */}
                </div>
        </div>

            </div>
            
        </div>
    );
};

export default TopNavbar;