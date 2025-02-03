import App from "@/App";
import AboutUs from "@/pages/AboutUs";
import Blogs from "@/pages/Blogs";
import Checkout from "@/pages/Checkout";
import ContactUs from "@/pages/ContactUs";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import OrderVerification from "@/pages/OrderVerification";
import PaymentSuccess from "@/pages/PaymentSuccess";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import Profile from "@/pages/Profile";
import ShoppingCart from "@/pages/ShoppingCart";
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
      ]
    },
  ]);


  export default router;