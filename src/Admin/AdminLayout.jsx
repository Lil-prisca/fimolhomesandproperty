import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import { supabase } from "../supabase";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin/login");
        return;
      }

      setUserEmail(session.user.email);
      setChecking(false);
    }

    checkAuth();

    // listen for auth changes (logout etc)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/admin/login");
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#020B18] flex items-center justify-center">
        <div className="text-white/50 text-sm">Checking access…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020B18] flex">
      <AdminSidebar userEmail={userEmail} />
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-10 pt-20 lg:pt-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
