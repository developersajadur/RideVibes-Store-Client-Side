import { Input } from "@/components/ui/input";
import { MdShoppingCart } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaUser, FaSearch, FaHeart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "../ui/button";
import { useToken } from "@/Hooks/useToken";

const Navbar = () => {
  const token = useToken();
  type TInput = {
    searchData: string;
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInput>();
  const onSubmit: SubmitHandler<TInput> = (data: TInput) => console.log(data);

  return (
    <div className="bg-primary w-full px-2 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6">
      {/* Large Device Navbar */}
      <div className="hidden md:hidden lg:block">
        <div className="flex justify-between items-center">
          <div className="">
            <Link to="/" className="text-white text-4xl font-semibold">
              RideVibes
            </Link>
          </div>

          <form className="w-7/12 relative" onSubmit={handleSubmit(onSubmit)}>
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              {...register("searchData", { required: true })}
              type="text"
              placeholder="Search Here"
              className="pl-10 bg-transparent border-secondary focus:ring-0 focus:outline-none text-white"
            />
          </form>

          <div className="flex items-center gap-8 text-secondary text-2xl font-medium">
            {token ? (
              <NavLink to="/profile">
                <FaUser />
              </NavLink>
            ) : null}
            <NavLink to="/">
              <FaHeart />
            </NavLink>
            <NavLink to="/shopping-cart">
              <MdShoppingCart />
            </NavLink>
            {!token ? (
              <NavLink to="/login">
                <Button className="bg-secondary text-primary">Login</Button>
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>

      {/* Small and medium Device navbar */}
      <div className="block md:block lg:hidden">
        <div className="flex justify-between items-center">
          <div className="">
            <Link to='/' className="text-white text-xl md:text-2xl font-semibold">
              RideVibes
            </Link>
          </div>

          <form className="w-6/12 relative" onSubmit={handleSubmit(onSubmit)}>
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              {...register("searchData", { required: true })}
              type="text"
              placeholder="Search Here"
              className="pl-10 bg-transparent border-secondary focus:ring-0 focus:outline-none text-white"
            />
          </form>

          <div className="">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button onClick={() => setOpen(true)}>
                  <IoMenu className="text-secondary font-medium" size={28} />
                </button>
              </SheetTrigger>
              <SheetContent className="h-full">
                <ScrollArea className="h-full">
                  <SheetHeader>
                    <Link to='/'  onClick={handleClose} className="mb-5 text-3xl font-semibold">
                      RideVibes
                    </Link>
                  </SheetHeader>
                  <div className="flex flex-col gap-5 text-primary text-lg font-medium">
                    {token ? (
                      <NavLink to="/profile" onClick={handleClose}>
                        Profile
                      </NavLink>
                    ) : null}
                    <NavLink to="/shopping-cart" onClick={handleClose}>
                      Cart
                    </NavLink>
                    <NavLink to="/favorites" onClick={handleClose}>
                      Favorites
                    </NavLink>
                    <NavLink to="/bicycles" onClick={handleClose}>
                      Bicycles
                    </NavLink>
                    <NavLink to="/about-us" onClick={handleClose}>
                      About Us
                    </NavLink>
                    <NavLink to="/contact-us" onClick={handleClose}>
                      Contact Us
                    </NavLink>
                    <NavLink to="/blogs" onClick={handleClose}>
                      Blogs
                    </NavLink>
                    {!token ? (
                      <NavLink  onClick={handleClose} className="w-full" to="/login">
                        <Button className="bg-secondary text-primary w-full">
                          Login
                        </Button>
                      </NavLink>
                    ) : null}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
