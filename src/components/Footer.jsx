import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/Fimollogo.png";

const footerLinks = {
  Properties: [
    "Houses for Sale",
    "Land for Sale",
    "Villas",
    "Apartments",
    "Commercial",
    "Short Let",
  ],
  Company: ["About Us", "Our Team", "Careers"],
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
    href: "https://www.instagram.com/fimolhomesandproperties",
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
    label: "Tiktok",
    href: "https://www.tiktok.com/@fimolhomesltd1?_r=1&_t=ZS-977sbFO5Wei",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "FaceBook",
    href: "https://www.facebook.com/share/1Uuwnx9xQk/?mibextid=wwXIfr",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
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
              <div className="w-9 h-9 rounded-lg bg-white  flex items-center justify-center">
                <img src={logo} alt="Logo" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Fimol <span className="text-gradient">Homes {""}</span>
                And Properties
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
                <span>2,Oba Ogundipe Byepass Liberty Road Ibadan</span>
              </div>
              {/* <div className="flex items-center gap-3"> */}
              <div className="flex flex-col gap-1  lg:flex-row">
                {[
                  {
                    num: "+2348119692684",
                    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
                    col: "green-500",
                    col2: "#00B328",
                  },
                  {
                    num: "+2348142619300",
                    d: "M3 2h3l1.5 3.5-1.75 1.05A10.5 10.5 0 007.45 9.5L8.5 7.75 12 9.25v2.75C12 13.5 10.5 14 9.75 14 4.75 14 2 9.25 2 4.25 2 3.5 2.5 2 4 2z",
                    col: "blue-400",
                  },
                  {
                    num: "+2347045149357",
                    d: "M3 2h3l1.5 3.5-1.75 1.05A10.5 10.5 0 007.45 9.5L8.5 7.75 12 9.25v2.75C12 13.5 10.5 14 9.75 14 4.75 14 2 9.25 2 4.25 2 3.5 2.5 2 4 2z",
                    col: "blue-400",
                  },
                ].map((phone) => (
                  <div key={phone.num} className=" ">
                    <a
                      href={`tel:${phone.num}`}
                      className=" flex flex-row gap-2 text-white/70 hover:text-white transition-colors text-sm"
                    >
                      <svg
                        className={`w-5 h-5 text-${phone.col} shrink-0`}
                        fill={phone.col2}
                        viewBox="0 0 24 24"
                        // viewBox="0 0 16 16"
                        // fill="none"
                      >
                        <path
                          d={phone.d}
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {phone.num}
                    </a>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-blue-400 shrink-0"
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
                <span>fimolhomeandpProperties@gmail.com</span>
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
