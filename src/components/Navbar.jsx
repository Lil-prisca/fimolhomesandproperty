import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Fimollogo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Our Products", to: "/allproperties" },
  // { label: "Testimonials", to: "/testimonials" },
  { label: "Contact Us", to: "/contact-us" },
];

export default function Navbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 glassnav ${
          scrolled ? " glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className=" w-30">
              <img src={logo} alt="Filmol-Homes Logo" />
            </div>
          </Link>

          {/* Desktop nav */}
          {props.home ? (
            <div className="hidden md:flex items-center lg:gap-8 md:gap-5 md">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.4, duration: 0.4 }}
                  className={({ isActive }) =>
                    isActive
                      ? "text-lg text-black/70 hover:text-black transition-colors duration-200 relative group border-b-2 border-blue-400"
                      : "text-lg text-black/70 hover:text-black transition-colors duration-200 relative group"
                  }
                >
                  {link.label}

                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
                </NavLink>
              ))}
            </div>
          ) : null}

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <motion.Link
              to="/allproperties"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="btn-primaryone "
            >
              Browse Listings
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-black block transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-black block"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                className="w-6 h-0.5 bg-black block"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 glassmenu  p-6 md:hidden"
          >
            {props.home ? (
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 text-lg py-2 transition-colors"
                        : "text-black/80  text-lg py-2 transition-colors"
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <a
                  href="#properties"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary mt-2 justify-center"
                >
                  Browse Listings
                </a>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
