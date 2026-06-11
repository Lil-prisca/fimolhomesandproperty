import { motion } from "framer-motion";
import gettingland from "../assets/Mangettingland.jpeg";

export default function CTASection() {
  return (
    <section id="contact" className="py-24 lg:py-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* BG image */}
          <div className="absolute inset-0">
            <img
              // src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85"
              src={gettingland}
              alt="Luxury property"
              className="h-full w-full object-cover object-center"
              // sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020B18]/95 via-[#041629]/80 to-[#0A2A4A]/60" />
          </div>

          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ boxShadow: "inset 0 0 80px rgba(43,156,219,0.1)" }}
          />

          {/* Content */}
          <div className="relative z-10 p-12 lg:p-20">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-10 bg-blue-400" />
                <span className="section-label">Start Your Journey</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Your Perfect
                <span className="text-gradient block">Property Awaits</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-white/60 text-base lg:text-lg leading-relaxed mb-10"
              >
                Browse our complete catalogue of verified homes, villas, and
                land for sale. And let our experts help you close the deal.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#properties"
                  className="btn-primary text-base py-4 px-10 justify-center"
                >
                  Browse All Listings
                  <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="tel:+2348001234567"
                  className="btn-outline text-base py-4 px-10 justify-center"
                >
                  <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 2h3l1.5 3.5-1.75 1.05A10.5 10.5 0 007.45 9.5L8.5 7.75 12 9.25v2.75C12 13.5 10.5 14 9.75 14 4.75 14 2 9.25 2 4.25 2 3.5 2.5 2 4 2z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Speak to an Agent
                </a>
              </motion.div>

              {/* Urgency badge */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
                className="mt-8 flex items-center gap-3"
              >
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative w-8 h-8 rounded-full border-2 border-[#041629] overflow-hidden"
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-white/50 text-sm">
                  <span className="text-white font-semibold">150+ clients</span>
                  found their property this month
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
