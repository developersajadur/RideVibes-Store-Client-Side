import App from "@/App";
import AboutUs from "@/pages/AboutUs";
import Blogs from "@/pages/Blogs";
import ContactUs from "@/pages/ContactUs";
import Favorites from "@/pages/Favorites";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import Profile from "@/pages/Profile";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: '/',
            element: <Home/>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
        {
            path: '/profile',
            element: <Profile/>,
        },
        {
            path: '/bicycles',
            element: <Products/>,
        },
        {
            path: '/bicycles/:slug',
            element: <ProductDetails/>,
        },
        {
            path: '/favorites',
            element: <Favorites/>,
        },
        {
            path: '/about-us',
            element: <AboutUs/>,
        },
        {
            path: '/contact-us',
            element: <ContactUs/>,
        },
        {
            path: '/blogs',
            element: <Blogs/>,
        },
      ]
    },
  ]);


  export default router;