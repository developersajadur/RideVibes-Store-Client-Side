import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import CreateProduct from "@/pages/AdminPages/CreateProduct";
import Dashboard from "@/pages/AdminPages/Dashboard";
import ManageOrders from "@/pages/AdminPages/ManageOrders";
import ManageProduct from "@/pages/AdminPages/ManageProduct";
import ManageUsers from "@/pages/AdminPages/ManageUsers";
import UpdateProduct from "@/pages/AdminPages/UpdateProduct";
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
import Register from "@/pages/UserPages/Register";
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
            path: '/register',
            element: <Register/>,
        },
        {
            path: '/profile',
            element: <ProtectedRoute role="customer"><Profile/></ProtectedRoute>,
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
            element: <ProtectedRoute role="customer"><ShoppingCart/></ProtectedRoute>,
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
            element: <ProtectedRoute role="customer"><Checkout/></ProtectedRoute>,
        },
        {
            path: '/order/verify',
            element: <ProtectedRoute role="customer"><OrderVerification/></ProtectedRoute>,
        },
      ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute role="admin">
                <AdminLayout />
            </ProtectedRoute>
        ),  // Wraps admin routes
        children: [
            {
                path: "",   // This will render `Dashboard` at `/admin`
                element: <Dashboard />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "create-product",
                element: <CreateProduct />,
            },
            {
                path: "manage-products",
                element: <ManageProduct />,
            },
            {
                path: "manage-products/update-product/:productId",
                element: <UpdateProduct />,
            },
            {
                path: "manage-orders",
                element: <ManageOrders />,
            },
            {
                path: "manage-users",
                element: <ManageUsers />,
            },
        ],
    },
  ]);


  export default router;