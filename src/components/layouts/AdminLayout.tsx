import { Outlet } from "react-router-dom";
import AdminSidebar from "../shared/AdminSidebar";

const AdminLayout = () => {
    return (
        <div className="flex lg:flex-row h-screen">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="w-full p-4">
                <Outlet /> 
            </div>
        </div>
    );
};

export default AdminLayout;
