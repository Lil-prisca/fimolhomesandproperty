"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import vid from "../assets/Hero.mp4";

const WHATSAPP_NUMBER = "2348144169686";
// const WHATSAPP_NUMBER = "2348119692684";

const whatsappMessage = encodeURIComponent(
  `Hi, I'm interested in Investing in a  Property. Please provide more details.`,
);

const stats = [
  { value: "2,400+", label: "Properties Listed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years of Excellence" },
  { value: "₦850B+", label: "Assets Managed" },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden noise-overlay"
    >
      {/* Background parallax image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <video
          src={vid}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020B18]/60 via-[#020B18]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020B18]/40 via-transparent to-transparent" />
      </motion.div>
      {/* Floating orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #2D9CDB, transparent)" }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, #1B6EBF, transparent)" }}
      />
      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24 pt-40 w-full"
      >
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-[#020B18]" />
            <span className="text-[#020B18]   text-2xl ">
              Premium Real Estate
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] text-white"
            >
              Find Your
              <span className="block text-gradient">Dream Property</span>
              in Nigeria
            </motion.h1>
          </div>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-white text-lg lg:text-xl leading-relaxed max-w-xl mb-10"
          >
            Curated houses, villas, and prime land for sale across Nigerias most
            sought-after locations. Discover properties that match your
            lifestyle and investment goals.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link to="/allproperties" className="btn-primary">
              Browse All Listings
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

            {/* <a href="#categories" className="btn-outline">
              Explore Categories
            </a> */}
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
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1, duration: 0.5 }}
                className="glass rounded-xl px-4 py-4"
              >
                <div className="font-display text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/50 tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      {/* Search bar floating at bottom */}
      {/* <motion.div */}
      {/* // initial={{ opacity: 0, y: 40 }} */}
      {/* // animate={{ opacity: 1, y: 0 }} */}
      {/* {/* // // transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }} */}
      {/* {/* // // className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-10 */}
      {/* w-full" // */}
      {/* <div className="glass rounded-2xl p-3 flex flex-col sm:flex-row gap-3"> */}
      {/* <div className="flex-1 flex items-center gap-3 px-4"> */}
      {/* <svg */}
      {/* // // className="w-5 h-5 text-blue-400 flex-shrink-0" // viewBox="0 0 20 */}
      {/* 20" // fill="none" // */}
      {/* <path */}
      {/* // d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.37-1.41 1.42-4.38-4.38zM8 14A6 */}
      {/* 6 0 108 2a6 6 0 000 12z" // fill="currentColor" /* / */}
      {/* </svg> */}
      {/* <input */}
      {/* // type="text" // // placeholder="Search by city, neighbourhood, or */}
      {/* property type…" // // // className="w-full bg-transparent text-white */}
      {/* placeholder-white/35 text-sm outline-none py-2" // */}
      {/* </div> */}
      {/* <div className="flex gap-2"> */}
      {/* <select className="bg-white/10 text-white/70 text-sm rounded-xl px-4 py-2 outline-none border border-white/10 cursor-pointer"> */}
      {/* <option value="">For Sale</option> */}
      {/* <option value="land">Land</option> */}
      {/* <option value="house">House</option> */}
      {/* <option value="villa">Villa</option> */}
      {/* </select> */}
      {/* <button className="btn-primary py-2 px-6 text-sm rounded-xl whitespace-nowrap"> */}
      {/* Search */}
      {/* </button> */}
      {/* </div> */}
      {/* </div> */}
      {/* </motion.div> */}
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-36 right-10 hidden lg:flex flex-col items-center gap-2 z-10"
      >
        <span className="text-white/30 text-xs tracking-widest rotate-90 mb-3">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-center justify-center"
        >
          <div className="w-1 h-2 bg-blue-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
