import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/Fimollogo.png";
// import SidebarContent from "./SidebarContent";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 10L10 3l7 7M5 8v8h4v-5h2v5h4V8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Properties",
    href: "/admin/properties",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <rect
          x="2"
          y="7"
          width="16"
          height="11"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 7V5a4 4 0 018 0v2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 13h4M10 11v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Add Property",
    href: "/admin/newproperty",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 6v8M6 10h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Import CSV",
    href: "/admin/import",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 3v10M6 9l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 15h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path
          d="M2 4h16a1 1 0 011 1v9a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M1 5l9 6 9-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function AdminSidebar({ userEmail }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    // TODO: add supabase signOut here when connecting to database
    navigate("/admin/login");
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="block w-32">
          <img src={logo} alt="Fimol Home & Properties" />
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-400" />
          <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">
            Admin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* View site + logout */}
      <div className="p-4 border-t border-white/10">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white/70 transition-colors mb-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5v5M8.5 7.5L14 2"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          View Live Site
        </Link>

        <div className="glass rounded-xl px-4 py-3">
          <div className="text-white/60 text-xs mb-1 truncate">{userEmail}</div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-red-400/70 hover:text-red-400 text-xs transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {loggingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 bg-[#041629] border-r border-white/10 z-40">
        {/* <SidebarContent /> */}
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#041629] border-b border-white/10 px-4 h-16 flex items-center justify-between">
        <div className="w-28">
          <img src={logo} alt="Fimol Home & Properties" />
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-white block"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-0.5 bg-white block"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-white block"
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-y-0 left-0 w-72 bg-[#041629] border-r border-white/10 z-40 pt-16"
          >
            {/* <SidebarContent /> */}
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
export default SidebarContent;
