
// react icons
import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-primary w-full p-6 md:p-9">
            <div className="flex justify-between gap-[30px] flex-wrap w-full">

                <div className="">
                    <h3 className="text-[1.2rem] font-semibold text-secondary mb-2">Services</h3>
                    <div className="flex text-white flex-col gap-[10px]">
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">UI
                            Components</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Website
                            Templates</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Icons</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Opacity
                            Palette</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Blocks</p>
                    </div>
                </div>


                <div>
                    <h3 className="text-[1.2rem] font-semibold text-secondary mb-2">Company</h3>
                    <div className="flex text-white flex-col gap-[10px]">
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Service</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Features</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Our
                            Team</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Portfolio</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Blog</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Contact
                            Us</p>
                    </div>
                </div>


                <div>
                    <h3 className="text-[1.2rem] font-semibold text-secondary mb-2">Our Social Media</h3>
                    <div className="flex text-white flex-col gap-[10px]">
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Dribbble</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Behance</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Medium</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Instagram</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Facebook</p>
                        <p className="text-[0.9rem] text-white hover:text-[#3B9DF8] cursor-pointer transition-all duration-200">Twitter</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-[1.2rem] font-semibold text-secondary mb-2">Join a
                        Newsletter</h3>
                    <div className="flex gap-[2px] flex-col text-white relative">
                        <label className="text-[0.9rem]">Your Email</label>
                        <input type="email"
                               className="py-3 px-4 w-full pr-[90px] rounded-md border border-primary outline-none"
                               placeholder="Email address"/>

                        <button
                            className="px-4 h-[67%] rounded-r-md bg-[#3B9DF8] text-white absolute top-[24px] right-0">Submit
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="border-t border-gray-200 pt-[20px] mt-[40px] flex items-center justify-between w-full flex-wrap gap-[20px]">
                <Link to='/' className="text-2xl lg:text-4xl font-semibold text-secondary">RideVibes</Link>

                <p className="text-[0.9rem] text-white">© {currentYear} RideVibes. All Rights
                    Reserved. </p>

                <div className="flex items-center gap-[10px] text-white">
                    <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] transition-all duration-300">
                        <CgFacebook/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] transition-all duration-300">
                        <BsTwitter/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] transition-all duration-300">
                        <BsInstagram/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] transition-all duration-300">
                        <BsLinkedin/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
                    