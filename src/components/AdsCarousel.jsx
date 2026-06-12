import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Ad1 from "../assets/Ads1.jpeg";

const ads = [
  {
    id: 1,
    image: Ad1,
    title: "Prime Commercial Space",
    subtitle: "Own a shop in Ibadan. Secure steady rental income.",
    cta: "Learn More",
    link: "/allproperties?type=Commercial",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    title: "Land for Sale",
    subtitle: "Affordable plots in prime locations across Nigeria.",
    cta: "View Listings",
    link: "/allproperties?type=Land",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    title: "Luxury Apartments",
    subtitle: "Experience premium living in Victoria Island.",
    cta: "Explore Now",
    link: "/allproperties?type=Luxury+Apartment",
  },
];

export default function AdsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % ads.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + ads.length) % ads.length);
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [paused, next]);

  return (
    <div
      className=" mb-20 w-[90%]  mx-auto relative lg:w-300 lg:h-120 overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className=" relative h-100  md:h-120">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={ads[current].image}
              alt={ads[current].title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020B18]/80 via-[#020B18]/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center px-8 md:px-12">
              <div className="max-w-md">
                {/* <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-2xl md:text-3xl font-bold text-white mb-2 leading-tight"
                >
                  {ads[current].title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/60 text-sm mb-5 leading-relaxed"
                >
                  {ads[current].subtitle}
                </motion.p>
                <motion.a
                  href={ads[current].link}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="btn-primary text-sm py-2.5 px-6 inline-flex"
                >
                  {ads[current].cta}
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a> */}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 4L6 8l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {ads.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-blue-400"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        {!paused && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-10">
            <motion.div
              key={current}
              className="h-full bg-blue-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
