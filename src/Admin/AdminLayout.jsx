import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#020B18] flex">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-10 pt-20 lg:pt-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
