import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import AboutUs from "@/pages/UserPages/AboutUs";
import Blogs from "@/pages/UserPages/Blogs";
import Checkout from "@/pages/UserPages/Checkout";
import ContactUs from "@/pages/UserPages/ContactUs";
import Home from "@/pages/UserPages/Home";
import Login from "@/pages/UserPages/Login";
import OrderVerification from "@/pages/UserPages/OrderVerification";
import ProductDetails from "@/pages/UserPages/ProductDetails";
import Products from "@/pages/UserPages/Products";
import Profile from "@/pages/UserPages/Profile";
import ShoppingCart from "@/pages/UserPages/ShoppingCart";
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
            path: '/shopping-cart',
            element: <ShoppingCart/>,
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
        {
            path: '/checkout/:productId',
            element: <Checkout/>,
        },
        {
            path: '/order/verify',
            element: <OrderVerification/>,
        },
      ],
    },
    {
        path: '/admin',
        element: <AdminLayout/>
    }
  ]);


  export default router;