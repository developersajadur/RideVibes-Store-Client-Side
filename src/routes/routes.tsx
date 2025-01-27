import App from "@/App";
import AboutUs from "@/pages/AboutUs";
import Bicycles from "@/pages/Bicycles";
import Blogs from "@/pages/Blogs";
import ContactUs from "@/pages/ContactUs";
import Favorites from "@/pages/Favorites";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
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
            element: <Bicycles/>,
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