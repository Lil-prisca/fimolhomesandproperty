import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import logo from "../Fimollogo.png";

const footerLinks = {
  Properties: [
    "Houses for Sale",
    "Land for Sale",
    "Villas",
    "Apartments",
    "Commercial",
    "Short Let",
  ],
  Company: ["About Us", "Our Team", "Careers", "Press", "Blog", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const socials = [
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-[#020b18] border-t border-white/10 pt-20 pb-10 px-6 lg:px-10">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Newsletter */}
        <div
          className="glass rounded-2xl p-6 flex 
flex-col sm:flex-row items-center 
justify-between gap-6 mb-12"
        >
          <div>
            <h4
              className="font-display text-lg 
font-semibold text-white mb-1"
            >
              Get New Listings First
            </h4>
            <p
              className="text-white/45 
text-sm"
            >
              Subscribe for weekly property alerts and market insights.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-white/10 border border-white/10 text-white placeholder-white/30 text-sm rounded-xl pl-3 py-3 outline-none focus:border-blue-500 transition-colors flex-1/2  sm:w-30"
            />
            <button className="btn-primarynew   text-sm rounded-xl whitespace-nowrap ">
              Subscribe
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 2L2 7v9h5v-5h4v5h5V7L9 2z"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </svg>
              </div>
              <span className="font-display text-xl font-bold text-white">
                Fimol<span className="text-gradient">Home</span>
              </span>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
              Nigeria's premier destination for luxury properties, prime land,
              and exclusive real estate investment opportunities.
            </p>

            {/* Contact info */}
            <div className="space-y-3 text-sm text-white/50">
              <div className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6A4.5 4.5 0 0 0 8 1.5zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                    fill="currentColor"
                  />
                </svg>
                <span>14 Adeola Odeku Street, Victoria Island, Lagos</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-blue-400 flex-shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 2h3l1.5 3.5-1.75 1.05A10.5 10.5 0 007.45 9.5L8.5 7.75 12 9.25v2.75C12 13.5 10.5 14 9.75 14 4.75 14 2 9.25 2 4.25 2 3.5 2.5 2 4 2z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>+234 800 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-blue-400 flex-shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M14 4L8 9 2 4"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                <span>hello@FimolHome&Properties.ng</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-7">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/50 hover:text-blue-400 transition-colors duration-200"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white text-sm font-semibold mb-5 tracking-wide">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Fimol Home & Properties Nigeria Ltd.
            All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
