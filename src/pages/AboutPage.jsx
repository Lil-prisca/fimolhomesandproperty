import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import gettingland from "../assets/Mangettingland.jpeg";
import ceo from "../assets/Ceopics.jpeg";

const WHATSAPP_NUMBER = "2348144169686";
// const PHONE_NUMBER = "+2348144169686";

const whatsappMessage = encodeURIComponent(
  `Hi, I'm interested in Investing in a  Property. Please provide more details.`,
);

const team = [
  {
    name: "Oluwafunmilayo Imoleayo",
    role: "Founder & CEO",
    image: ceo,
    tiktok: "https://www.tiktok.com/@oluwafunmilayo.ti6?_r=1&_t=ZS-977uvaUqncS",
    instagram: "https://www.instagram.com/funmilayoimoleayo",
    bio: "15+ years experience in Nigerian real estate. Passionate about connecting people with their dream properties.",
    bios: "professional journey is marked by a spectrum of projects where he has showcased his proficiency as a GIS expert and facilitated countless individuals as a property acquisition consultant, amassing over 6 years of invaluable experience. Renowned for his adept leadership, analytical acumen, and problem-solving prowess, he has spearheaded initiatives across diverse environmental development domains, wielding his extensive knowledge to effect positive change. Recently",
  },
  {
    name: "Chioma Okafor",
    role: "Head of Sales",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Expert in luxury residential properties across Lagos and Abuja with a portfolio of over ₦10B in transactions.",
  },
  // {
  //   name: "Emeka Nwosu",
  //   role: "Lead Property Consultant",
  //   image:
  //     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  //   bio: "Specialises in commercial real estate and land acquisition across Nigeria's key investment corridors.",
  // },
  // {
  //   name: "Fatima Al-Hassan",
  //   role: "Client Relations Manager",
  //   image:
  //     "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  //   bio: "Dedicated to ensuring every client receives a seamless, personalised property search experience.",
  // },
];

const stats = [
  { value: "2,400+", label: "Properties Listed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years of Excellence" },
  { value: "₦850B+", label: "Assets Managed" },
];

const values = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Integrity",
    desc: "We operate with complete transparency and honesty in every transaction, ensuring our clients always make informed decisions.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 10V3L4 14h7v7l9-11h-7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Excellence",
    desc: "From our listings to our service, we hold ourselves to the highest standards in everything we do.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "People First",
    desc: "Every decision we make is guided by what is best for our clients, our team, and the communities we serve.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Nigeria Focus",
    desc: "Deep local knowledge across all 36 states, giving our clients an unmatched understanding of Nigeria's property landscape.",
  },
];

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  return (
    <>
      <Navbar home />
      <main className="text-[#020B18] bg-white min-h-screen mt-20">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden noise-overlay">
          <div className="absolute inset-0 z-0">
            <img
              src={gettingland}
              alt="About Fimol"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020B18] via-[#020B18]/70 to-[#020B18]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020B18]/80 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-40 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-10 bg-blue-400" />
              <span className="section-label">Who We Are</span>
            </motion.div>
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white max-w-3xl"
            >
              Built on Trust,
              <span className="block text-gradient">Driven by Excellence</span>
            </motion.h1>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl px-4 py-6 text-center"
              >
                <div className="font-display text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/50 tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-7xl text-black mx-auto px-6 lg:px-10 py-16">
          <div className="grid  lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-blue-400" />
                <span className="section-label">Our Story</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
                A Decade of Connecting
                <span className="block text-gradient">Nigerians to Home</span>
              </h2>
              <div className="space-y-4 text-black  leading-relaxed">
                <p>
                  Fimol Home & Properties was founded in 2009 with a simple but
                  powerful belief — that every Nigerian deserves access to
                  quality real estate, presented with transparency and
                  professionalism.
                </p>
                <p>
                  What began as a small Lagos-based consultancy has grown into
                  one of Nigeria's most trusted property platforms, with
                  listings spanning every state and a team of dedicated
                  professionals who understand the nuances of each market.
                </p>
                <p>
                  Over 15 years, we have facilitated thousands of transactions —
                  from first-time buyers finding their starter home in Enugu, to
                  institutional investors acquiring prime commercial land in
                  Abuja. Every deal, regardless of size, receives the same level
                  of care and attention.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85"
                  alt="Our story"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020B18]/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 border border-white/10">
                <div className="font-display text-2xl font-bold text-white">
                  2009
                </div>
                <div className="text-white/50 text-xs mt-0.5">
                  Founded in Lagos
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 relative">
          <div className="absolute inset-0 grid-dots opacity-30 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass rounded-2xl p-8 border border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="w-12 h-12 rounded-xl bg-[#020B18]/20 border border-[#020B18]/30 flex items-center justify-center mb-6 text-b[#020B18]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-blue-400" />
                  <span className="section-label">Our Vision</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Nigeria's Most Trusted Property Platform
                </h3>
                <p className="text-white/55 leading-relaxed">
                  To become the definitive destination for real estate in
                  Nigeria — a platform where every buyer, seller, and investor
                  can transact with complete confidence, backed by verified
                  listings, expert guidance, and world-class service.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass rounded-2xl p-8 border border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-emerald-400" />
                  <span className="section-label">Our Mission</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Simplifying Property for Every Nigerian
                </h3>
                <p className="text-white/55 leading-relaxed">
                  To simplify the property journey for every Nigerian — making
                  it easier, safer, and more rewarding to find, buy, sell, and
                  invest in real estate through technology, local expertise, and
                  an unwavering commitment to our clients.
                </p>
              </motion.div>

              {/* Goal */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass rounded-2xl p-8 border border-white/10 relative overflow-hidden lg:col-span-2"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-2xl" />
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center mb-6 text-yellow-400">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px w-8 bg-yellow-400" />
                      <span className="section-label">Our Goal</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-4">
                      10,000 Families Housed by 2030
                    </h3>
                    <p className="text-white/55 leading-relaxed">
                      By 2030, we aim to have directly facilitated over 10,000
                      successful property transactions across Nigeria — helping
                      families find homes, investors build wealth, and
                      businesses secure the spaces they need to grow.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        value: "10,000+",
                        label: "Families Housed",
                        color: "text-yellow-400",
                      },
                      {
                        value: "36",
                        label: "States Covered",
                        color: "text-blue-400",
                      },
                      {
                        value: "₦2T+",
                        label: "Assets Facilitated",
                        color: "text-emerald-400",
                      },
                      {
                        value: "2030",
                        label: "Target Year",
                        color: "text-purple-400",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="glass rounded-xl p-4 text-center border border-white/10"
                      >
                        <div
                          className={`font-display text-2xl font-bold mb-1 ${item.color}`}
                        >
                          {item.value}
                        </div>
                        <div className="text-white/40 text-xs">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-blue-400" />
              <span className="section-label">What We Stand For</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-black">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500/25 transition-colors">
                  {val.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-24 relative">
          <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-blue-400" />
                <span className="section-label">The People Behind It</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-black">
                Meet Our Team
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:max-w-2xl lg:m-auto gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  onClick={() => setSelectedMember(member)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="glass rounded-2xl overflow-hidden border border-white/10 group hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="relative h-56  overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020B18]/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-white mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-blue-400 text-xs font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 lg:p-16 border border-white/10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-10 bg-blue-400" />
                <span className="section-label">Ready to Begin?</span>
                <div className="h-px w-10 bg-blue-400" />
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Let's Find Your
                <span className="block text-gradient">Perfect Property</span>
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
                Whether you're buying, selling, or investing — our team is ready
                to guide you every step of the way.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/allproperties" className="btn-primary">
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
                </Link>
                <div
                  className="px-6 rounded-3xl py-3 text-[20px]"
                  style={{
                    background: "linear-gradient(135deg,#25D366,#128C7E)",
                    boxShadow: "0 0 20px rgba(37,211,102,0.25)",
                  }}
                >
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" "
                  >
                    Book Inspection
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-md w-full overflow-hidden relative"
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center z-10"
                >
                  ✕
                </button>

                <div className="max-h-70 overflow-hidden">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="p-6 overflow-y-auto max-h-75">
                  <div className="mb-5 flex justify-between">
                    <a
                      href={selectedMember.tiktok}
                      className="flex gap-2 text-blue-600"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      <span>Tiktok</span>
                    </a>
                    <a
                      href={selectedMember.instagram}
                      className="flex gap-2  text-blue-600"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      <span>Instagram</span>
                    </a>
                  </div>
                  <h3 className="text-2xl font-bold text-[#020B18]">
                    {selectedMember.name}
                  </h3>

                  <p className="text-blue-600 font-medium mb-4">
                    {selectedMember.role}
                  </p>

                  <p className="text-gray-600 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedMember.bios}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Footer />
      </main>
    </>
  );
}
